// create a route handler
const router = require('express').Router();
const yelpService = require('../services/yelp');

// Set up our routes
router.get('/', (req, res) => {
  res.render('index');
});


router.post('/findcity', yelpService.getCity, (req, res) => {
  const city = res.getcity;
  res.redirect(`explore?location=${city}`);
});

module.exports = router;
