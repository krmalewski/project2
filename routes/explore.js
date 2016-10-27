// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');

// Set up our routes
router.get('/', yelpService.keepCity, yelpService.initialSearch, dbService.getFavorites, (req, res) => {
  res.render('explore', {
    results: res.attractions,
    favorites: res.favorite || [],
    city: res.keepcity,
  });
});

// router.get('/', yelpService.initialSearch, (req, res) => {
//   res.json(res.attractions);
// });


router.post('/favorites', yelpService.getCity, dbService.saveFavorite, (req, res) => {
  const city = res.getcity;
  res.redirect(`/explore?location=${city}`);
});

router.delete('/favorites/:id', yelpService.getCity, dbService.deleteFavorites, (req, res) => {
  const city = res.getcity;
  res.redirect(`/explore?location=${city}`);
});

module.exports = router;
