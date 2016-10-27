// create a route handler
const router = require('express').Router();

const yelpService = require('../services/yelp');
const dbService = require('../models/favorites');

// Set up our routes

router.get('/', yelpService.getCity, yelpService.searchAttractions, dbService.getFavorites, (req, res) => {
  const city = res.city;
  console.log(city)
  res.render('search', {
    favorites: res.favorite || [],
    places: res.search,
    city: res.city,
  });
});

router.delete('/favorites/:id', yelpService.getCity, dbService.deleteFavorites, (req, res) => {
  console.log(res.city);
  const city = res.city;
  res.redirect(`/search?location=${city}`)
});
//   res.redirect(`/search?location=${city}`);
// });


// router.get('/', yelpService.keepCity, yelpService.searchAttractions, dbService.getFavorites, (req, res) => {
//   const city = res.city;
//   console.log(city)
//   res.json(res.search);
// });


// router.delete('/favorites/:id', yelpService.getCity, dbService.getFavorites, dbService.deleteFavorites, (req, res) => {
//   res.redirect('/search');
// });

module.exports = router;
