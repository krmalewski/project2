// create a route handler
const router = require('express').Router();
const yelpService = require('../services/yelp');
const mapService = require('../services/maps');
const dbService = require('../models/favorites');

// Set up our routes
router.get('/', (req, res) => {
  res.render('index');
});


// router.get('/findcity', mapService.autocompleteCity, yelpService.initialSearch, (req, res) => {
//   res.json(res.city);
// });


// router.post('/findcity', yelpService.getCity, (req, res) => {
//   const city = res.getcity;
//   res.redirect(`explore?location=${city}`);
// });

module.exports = router;
