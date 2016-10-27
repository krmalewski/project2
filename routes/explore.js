// create a route handler
const router = require('express').Router();

const yelpService = require('./services/yelp');

// Set up our routes
router.get('/', yelpService.requestYelp, (req, res) => {
  res.json();
});

module.exports = router;
