const uuid = require('uuid/v4');
const { validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Biulding',
    description: 'One of the most famous sky scrapers in the world',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 W 34th, St, New York, NY 10001',
    creator: 'u1'
  }
]

////////////////////////////////////////////////////////////
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
    image: 'https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440',
    creator
  });
  
  try {
    await createdPlace.save();
  } catch(err) {
    const error = new HttpError('Creating place failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace }); 
}

//////////////////////////////////////////////////////////////
const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req); // make a validation 
  if(!errors.isEmpty()) {               // with express validator
    throw new HttpError('Invalid inputs passed. Please check your data.', 422); 
  }

  const { title, description } = req.body;
  const placeId = req.params.placeId;
  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id = placeId) }; //make copy
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_PLACES[placeIndex] = updatedPlace;
  console.log(placeIndex)

  res.status(200).json({place: updatedPlace});
}

////////////////////////////////////////////////////////////////
const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;

  if(!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError('Could not find a place for that id', 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({message: 'Deleted place.'})
}

module.exports = {
  createPlace,
  deletePlace,
  getPlaceById,
  updatePlaceById,
  getPlacesByUserId
}