// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');
const mapService = require('../services/maps');

// Set up our routes
// router.get('/', yelpService.keepCity, yelpService.initialSearch, dbService.getFavorites, (req, res) => {
//   res.render('explore', {
//     results: res.attractions,
//     favorites: res.favorite || [],
//     city: res.keepcity,
//   });
// });

// router.get('/', yelpService.initialSearch, (req, res) => {
//   res.json(res.attractions);
// });

router.get('/', mapService.autocompleteCity, yelpService.initialSearch, dbService.getFavorites, (req, res) => {
  console.log(res.city);
  res.render('explore', {
    city: res.city,
    results: res.attractions || [],
    favorites: res.favorite || [],
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

module.exports = router;
