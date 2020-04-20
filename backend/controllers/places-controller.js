const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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
const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find(p => p.creator === userId);

  if(!place) {
    return next(
      new HttpError('Could not found a place for provided user id.', 404)
    );
  } 

  res.json({place});
}

module.exports = {
  getPlaceById,
  getPlaceByUserId
}