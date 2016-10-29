const fetch = require('node-fetch');

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API_KEY = process.env.MAPS_KEY;

const SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'


function autocompleteCity(req, res, next) {
  const cityString = req.query.location;
  const array = cityString.split(',');

  let city = array[0].trim();
  for ( let i = 1; i < array.length; i++ ) {
    const word = array[i].trim();
    city += `+${word}`;
  }

  fetch(`${API_URL}address=${city}&key=${API_KEY}`)
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

function postCity(req, res, next) {
  const cityString = req.body.location;
  const array = cityString.split(',');
  const indexTwo = array[1].trim();
  res.postcity = `${array[0]}+${indexTwo}`;
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

function getAttraction(req, res, next) {
  const find = req.query.term;
  console.log(find);

  fetch(`${SEARCH_URL}query=${find}&key=${API_KEY}`)
 .then(r => r.json())
  .then((result) => {
    res.name = result.results[0].name;
    console.log(res.name);
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = {
  autocompleteCity,
  postCity,
  getCenter,
  getAttraction,
};
