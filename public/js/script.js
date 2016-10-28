// Code referenced from https://developers.google.com/maps/documentation/javascript/adding-a-google-map
function buildMap(req, res, next) {
  const center = { lat: -25.363, lng: 131.044 };

  const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: center,
  });
  console.log('mapsssss')
}
