// create a route handler
const router = require('express').Router();
const yelpService = require('../services/yelp');
const mapService = require('../services/maps');

// Set up our routes
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/findcity', mapService.autocompleteCity, yelpService.initialSearch, (req, res) => {
  console.log(res.city);
  res.render('explore', {
    city: res.city,
    results: res.attractions,
    favorites: [],
  });
});

// router.get('/findcity', mapService.autocompleteCity, yelpService.initialSearch, (req, res) => {
//   res.json(res.city);
// });


// router.post('/findcity', yelpService.getCity, (req, res) => {
//   const city = res.getcity;
//   res.redirect(`explore?location=${city}`);
// });

module.exports = router;
