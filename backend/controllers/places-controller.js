const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');

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
const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find(p => p.id === placeId)

  if(!place) {
    throw new HttpError('Could not found a place for provided id.', 404);
  } 
   
  res.json({place});
}

///////////////////////////////////////////////////////////
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const places = DUMMY_PLACES.filter(p => p.creator === userId);

  if(!places || places.length < 1) {
    return next(
      new HttpError('Could not found a place for provided user id.', 404)
    );
  } 
  console.log(DUMMY_PLACES)
  res.json({places});
}

//////////////////////////////////////////////////////////////
const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = { 
    id: uuid(),
    title,
    creator,
    address,
    description,
    location: coordinates
  }

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace }); 
}

//////////////////////////////////////////////////////////////
const updatePlaceById = (req, res, next) => {
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