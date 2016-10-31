/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint new-cap: ["error", { "capIsNew": false }]*/

// create a route handler
const router        = require('express').Router();

const mapServices   = require('../services/maps');
const dbService     = require('../models/favorites');

// Set up our routes
router.get('/', mapServices.autocompleteCity, mapServices.getCenter, dbService.getFavorites, (req, res) => {
  res.render('maps', {
    favorite: res.favorite,
    lat: res.center.lat,
    lng: res.center.lng,
    city: res.city,
  });
});


module.exports = router;
