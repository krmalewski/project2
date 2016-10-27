// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');

// Set up our routes
router.get('/', yelpService.initialSearch, (req, res) => {
  res.render('explore', {
    results: res.attractions,
  });
});

// router.get('/', yelpService.initialSearch, (req, res) => {
//   res.json(res.attractions);
// });


router.post('/favorites', yelpService.getCity, dbService.saveFavorite, (req, res) => {
  console.log(res.city)
  const city = res.city;
  res.redirect(`/explore?location=${city}`);
});


module.exports = router;
