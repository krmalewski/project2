/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */

// create a route handler
const router        = require('express').Router();

const yelpService   = require('../services/yelp');
const dbService     = require('../models/favorites');
const mapService    = require('../services/maps');

// Set up our routes

router.get('/', mapService.autocompleteCity, yelpService.searchAttractions, dbService.getFavorites, (req, res) => {
  res.render('search', {
    favorites: res.favorite || [],
    places: res.search || [],
    city: res.city,
  });
});


module.exports = router;
