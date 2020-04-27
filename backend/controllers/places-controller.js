const fs = require('fs');
const { validationResult} = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');


const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  
  let place;
  try {
    place = await Place.findById(placeId);
  } catch(err) {
    const error = new HttpError('Something went wrong, could not find a place.', 500);
    return next(error);
  }

  if(!place) {
    const error = new HttpError('Could not found a place for provided id.', 404);
    return next(error);
  } 
   
  //make this, because mongodb create _id and we want to rid by _;
  //we set getter to true, because we don't want to lost some of them;
  res.json({place: place.toObject( {getters: true} )});
}

///////////////////////////////////////////////////////////
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  
  let places;
  try {
    places = await Place.find({creator: userId});
  } catch(err) {
    const error = new HttpError('Fetching places failed. Please try again.', 500);
    return next(error);
  }

  if(!places || places.length < 1) {
    return next(
      new HttpError('Could not found a place for provided user id.', 404)
    );
  } 
  
  //to rid from _id in array, you need to use map;
  res.json({places: places.map(place => place.toObject( {getters: true} ))});
}

//////////////////////////////////////////////////////////////
const createPlace = async (req, res, next) => {
  const errors = validationResult(req); // make a validation 
  if(!errors.isEmpty()) {               // with express validator
    throw new HttpError('Invalid inputs passed. Please check your data.', 422); 
  }

  const { title, description, address, creator } = req.body;
  const coordinates = getCoordsForAddress(); // get DUMMY_COORDINATES;
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch(err) {
    const error = new HttpError('Creating place failed, you can try again.', 500);
    return next(error);
  }

  if(!user) {
    const error = new HttpError('Could not find user by provided id.', 404);
    return next(error);
  }
  
  try {
    const sess = await mongoose.startSession(); //if one of this two operations failed;
    sess.startTransaction();              
    await createdPlace.save({ session: sess }); //whole transaction will fail;
    user.places.push(createdPlace)
    await user.save({session: sess});
    await sess.commitTransaction(); //end//
  } catch(err) {
    const error = new HttpError('Creating place failed, please try again!', 500);
    return next(error);
  } 

  res.status(201).json({ place: createdPlace }); 
}

//////////////////////////////////////////////////////////////
const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req); // make a validation 
  if(!errors.isEmpty()) {               // with express validator
    throw new HttpError('Invalid inputs passed. Please check your data.', 422); 
  }

  const { title, description } = req.body;
  const placeId = req.params.placeId;
  
  let place;
  try {
    place = await Place.findById(placeId);
  } catch(err) {
    const error = new HttpError('Updating a place failed, please try again.', 500);
    return next(error);
  }
 
  place.title = title;
  place.description = description;
 
  try {
    await place.save();
  } catch(err) {
    const error = new HttpError('Updating a place failed, please try again.', 500);
    return next(error);
  }
  
  res.status(200).json({place: place.toObject( {getters: true} )});
}

////////////////////////////////////////////////////////////////
const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await Place.findById(placeId).populate('creator');
  } catch(err) {
    const error = new HttpError('Deleting a place failed, please try again.', 500);
    return next(error);
  }

  if(!place) {
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({session: sess});
    place.creator.places.pull(place);
    await place.creator.save({session: sess});
    sess.commitTransaction();
  } catch(err) {
    const error = new HttpError('Deleting a place failed, please try again.', 500);
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err)
  });
  res.status(200).json({message: 'Deleted place.'})
}

module.exports = {
  createPlace,
  deletePlace,
  getPlaceById,
  updatePlaceById,
  getPlacesByUserId
}