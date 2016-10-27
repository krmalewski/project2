// create a route handler
const router = require('express').Router();
const yelpService = require('../services/yelp');

// Set up our routes
router.get('/', (req, res) => {
  res.render('index');
});


router.post('/search', yelpService.getCity, (req, res) => {
  const city = res.city;
  res.redirect(`explore?location=${city}`);
});

module.exports = router;
