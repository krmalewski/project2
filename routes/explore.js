// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');

// Set up our routes
router.get('/', (req, res) => {
  res.render('explore');
})


router.post('/search', yelpService.searchYelp, (req, res) => {
  console.log(res.yelp);
  res.render('explore', {
    results: res.yelp,
  });
});

module.exports = router;
