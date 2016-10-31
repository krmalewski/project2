const fetch = require('node-fetch');

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API_KEY = process.env.MAPS_KEY;

// This purpose of this function is to take in the city that the user input
// through the google autocomplete bar, locate information about this city
// using google's geocoding API and pass on that information (formatted
// address, lat/lng cooridates, and viewport to our view page
function autocompleteCity(req, res, next) {
  fetch(`${API_URL}address=${req.query.location}&key=${API_KEY}`)
  .then(r => r.json())
  .then((result) => {
    res.city = result.results;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

// When a user saves an item to their favorites collection, this middleware
// function keeps the current city that they are searching as a location parameter
// in the yelp search
function postCity(req, res, next) {
  const cityString = req.body.location;
  const array = cityString.split(',');
  if (array.length > 1) {
    const indexTwo = array[1].trim();
    res.postcity = `${array[0]}+${indexTwo}`;
  } else {
    res.postCity = cityString;
  }
  next();
}

// This function gets the latitude and longitude of the city that the user selected
// so that the map view can be centered
function getCenter(req, res, next) {
  const center = {
    lat: req.query.lat,
    lng: req.query.lng,
  };
  res.center = center;
  next();
}

module.exports = {
  autocompleteCity,
  postCity,
  getCenter,
};
