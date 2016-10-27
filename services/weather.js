const fetch = require('node-fetch');

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = process.env.OPENWEATHER_KEY;

// Code attributed to open_weather_search lab
function findWeatherByCity(req, res, next) {
  fetch(`${API_URL}q=${res.query.cityName}.units=imperial&APPID=${API_KEY}`)
  .then(r => r.json())
  .then((result) => {
    res.weather = result;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { findWeatherByCity };
