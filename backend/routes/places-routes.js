const express = require('express');
const { getPlaceById, getPlaceByUserId } = require('../controllers/places-controller');
const router = express.Router();

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPlaceByUserId);

module.exports = router;