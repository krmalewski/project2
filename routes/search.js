// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');

// Set up our routes

router.get('/', yelpService.keepCity, yelpService.searchAttractions, dbService.getFavorites, (req, res) => {
  res.render('search', {
    favorites: res.favorite || [],
    places: res.search,
    city: res.keepcity,
  });
});

router.delete('/favorites/:id', yelpService.getCity, dbService.deleteFavorites, (req, res) => {
  const city = res.getcity;
  res.redirect(`/search?location=${city}`);
});

router.post('/favorites', yelpService.getCity, dbService.saveFavorite, (req, res) => {
  const city = res.getcity;
  res.redirect(`/search?location=${city}`);
});


module.exports = router;
