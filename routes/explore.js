/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint new-cap: ["error", { "capIsNew": false }]*/

// create a route handler
const router          = require('express').Router();

const yelpService     = require('../services/yelp');
const dbService       = require('../models/favorites');
const mapService      = require('../services/maps');
const weatherService  = require('../services/weather');
const icons           = require('../public/js/weather-icons');

// Set up our routes
router.get('/', mapService.autocompleteCity, yelpService.initialSearch, weatherService.findWeatherByCity, dbService.getFavorites, (req, res) => {
  const icon = icons[res.weather.weather[0].main.toLowerCase()];
  res.render('explore', {
    city: res.city || [],
    results: res.attractions || [],
    favorites: res.favorite || [],
    weather: res.weather || [],
    icon,
  });
});

router.post('/favorites', mapService.postCity, dbService.saveFavorite, (req, res) => {
  const city = res.postcity;
  res.redirect(`/explore?location=${city}`);
});

router.delete('/favorites/:id', mapService.postCity, dbService.deleteFavorites, (req, res) => {
  const city = res.postcity;
  res.redirect(`/explore?location=${city}`);
});

router.get('/edit/:id', dbService.getAttraction, mapService.autocompleteCity, (req, res) => {
  res.render('edit', {
    item: res.attraction,
    city: res.city,
  });
});

router.put('/:id', dbService.editAttraction, mapService.postCity, (req, res) => {
  const city = res.postcity;
  res.redirect(`/explore?location=${city}`);
});

module.exports = router;
