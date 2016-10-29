const fetch = require('node-fetch');

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API_KEY = process.env.MAPS_KEY;


https://maps.googleapis.com/maps/api/geocode/json?address=Dublin+Ireland&Ykey=AIzaSyA09kvA9vyvsfp5YwCTMycQ8DUMP5Pzbfo

function autocompleteCity(req, res, next) {
  const cityString = req.query.location;
  console.log(cityString)
  const array = cityString.split(',');
  console.log(array)
  // let city = array[0];
  // let secondWord = array[1].trim();
  // if (secondWord.charAt(secondWord.length) === ',') {
  //   secondWord = secondWord.slice(0, -1)
  // }
  let city = array[0].trim();
  for ( let i = 1; i < array.length; i++ ) {
    const word = array[i].trim();
    city += `+${word}`;
  }
  console.log(city);

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
};


function getCenter(req, res, next) {
  const center = {
    lat: req.query.lat,
    lng: req.query.lng,
  }
  res.center = center;
  next();
}

module.exports = {
  autocompleteCity,
  postCity,
  getCenter,
};
