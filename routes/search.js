// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');
const mapService = require('../services/maps');

// Set up our routes

router.get('/', mapService.autocompleteCity, yelpService.searchAttractions, dbService.getFavorites, (req, res) => {
  res.render('search', {
    favorites: res.favorite || [],
    places: res.search,
    city: res.city,
  });
});

// router.get('/', mapService.getAttraction, (req, res) => {
//   res.json(res.name);
// });

// router.delete('/favorites/:id', yelpService.getCity, dbService.deleteFavorites, (req, res) => {
//   const city = res.getcity;
//   res.redirect(`/search?location=${city}`);
// });

// router.post('/favorites', yelpService.getCity, dbService.saveFavorite, (req, res) => {
//   const city = res.getcity;
//   res.redirect(`/search?location=${city}`);
// });


module.exports = router;
