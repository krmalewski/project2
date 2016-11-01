  // https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-hotelsearch
  // some help from here as well! :
  // http://stackoverflow.com/questions/13689705/how-to-add-google-maps-autocomplete-search-box
  console.log("profile");

  function makeAutocomplete() {
    const input = document.getElementById('autocomplete');
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-90,-180),
      new google.maps.LatLng(90,180));
    const options = {
      types: ['(cities)'],
      bounds: defaultBounds,
    };
    console.log('heree')
    const autocomplete = new google.maps.places.Autocomplete(input, options);
  }
  // google.maps.event.addDomListener(window, 'load', makeAutocomplete);

  makeAutocomplete();
