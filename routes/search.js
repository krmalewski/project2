/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint new-cap: ["error", { "capIsNew": false }]*/

// create a route handler
const router        = require('express').Router();

const yelpService   = require('../services/yelp');
const dbService     = require('../models/favorites');
const mapService    = require('../services/maps');
const weatherService  = require('../services/weather');
const icons         = require('../public/js/weather-icons');

// Set up our routes
router.get('/', mapService.autocompleteCity, yelpService.searchAttractions, weatherService.findWeatherByCity, dbService.getFavorites, (req, res) => {
  const icon = icons[res.weather.weather[0].main.toLowerCase()];
  res.render('search', {
    favorites: res.favorite || [],
    places: res.search || [],
    city: res.city,
    weather: res.weather,
    icon,
  });
});


module.exports = router;
