const fetch = require('node-fetch');

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const API_KEY = process.env.MAPS_KEY;


https://maps.googleapis.com/maps/api/geocode/json?address=Dublin+Ireland&Ykey=AIzaSyA09kvA9vyvsfp5YwCTMycQ8DUMP5Pzbfo

function autocompleteCity(req, res, next) {
  const cityString = req.query.location;
  const array = cityString.split(' ');
  let city = array[0];
  for ( let i = 1; i < array.length; i++ ) {
    let newWord = array[i].trim();
    city += `+${newWord}`;
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

module.exports = {
  autocompleteCity,
  postCity,
};
