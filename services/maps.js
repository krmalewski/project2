const fetch = require('node-fetch');

const API_URL = "https://maps.googleapis.com/maps/api/staticmap?";
const API_KEY = process.env.MAPS_KEY;



// Code referenced from https://developers.google.com/maps/documentation/static-maps/intro
function buildMap(req, res, next) {
  // Set parameters of search
  // The center parameter is required (defines the center of the map, equidistant from all edges of the map)
  // This his parameter takes a location as either a comma-separated {latitude,longitude} pair (e.g. "40.714728,-73.998672") or a string address (e.g. "city hall, new york, ny") identifying a unique location on the face of the earth
  const center = 'Berkley,CA';


  // const map = new google.maps.Map(document.getElementById('map'), {
  //   zoom: 4,
  //   center: location
  // });

  // const marker = new google.maps.Marker({
  //   position: location,
  //   map: map
  // });

  // console.log(req.body);
  const mapURL = `${API_URL}center=${center}&zoom=14&size=400x400&key=${API_KEY}`;

  res.map = mapURL;
  next();
}

module.exports = { buildMap };
