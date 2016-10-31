const fetch = require('node-fetch');

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API_KEY = process.env.MAPS_KEY;

// This purpose of this function is to take in the city that the user input
// through the google autocomplete bar, locate information about this city
// using google's geocoding API and pass on that information (formatted
// address, lat/lng cooridates, and viewport to our view page
function autocompleteCity(req, res, next) {
  // const cityString = req.query.location;
  // const array = cityString.split(',');

  // let city = array[0].trim();
  // for ( let i = 1; i < array.length; i++ ) {
  //   const word = array[i].trim();
  //   city += `+${word}`;
  // }

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
// function helps helps redirect the user to the
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
