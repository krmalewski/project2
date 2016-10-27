// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');

// Set up our routes

router.get('/', yelpService.getCity, yelpService.searchAttractions, dbService.getFavorites, (req, res) => {
  const city = res.city;
  res.render('search', {
    favorites: res.favorite || [],
    places: res.search,
  });
});


module.exports = router;
