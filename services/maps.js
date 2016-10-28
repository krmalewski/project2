const API_URL = 'https://maps.googleapis.com/maps/api/js?';
const API_KEY = process.env.MAPS_KEY;


const AUTO_CITY_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?';



function autocompleteCity(req, res, next) {

  const URL = `${AUTO_CITY_URL}input=${req.body.location}&types=geocode&key=${API_KEY}`;

  fetch(URL)
  .then(r => r.json())
  .then((result) => {
    res.attractions = result.businesses;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}


module.exports = {
  autocompleteCity,
};
