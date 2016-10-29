/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const mapService = require('../services/maps');
const SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
const API_KEY = 'AIzaSyA09kvA9vyvsfp5YwCTMycQ8DUMP5Pzbfo';


/* The following modules are needed for oAuth with Yelp's API */
// and help from Samuel Na!
const oauthSignature  = require('oauth-signature');
const n               = require('nonce')();
const fetch           = require('node-fetch');
const qs              = require('querystring');
const _               = require('lodash');

// The url we are using for the request
const url = 'http://api.yelp.com/v2/search';
// Set our secrets here
const consumerSecret = process.env.consumerSecret;
const tokenSecret = process.env.tokenSecret;
const consumerKey = process.env.oauth_consumer_key;
const oauthToken = process.env.oauth_token;

// This function will find the location the user wants to search for
// and send it to the explore page
function getCity(req, res, next) {
  res.getcity = req.body.location;
  next();
}

function keepCity(req, res, next) {
  res.keepcity = req.query.location;
  next();
}

// Code found at: https://arian.io/how-to-use-yelps-api-with-node/
// and help from Samuel Na!
// This function will get the location that the user searched on the login
// page and input that as the userParams. This will allow the initial
// tourist attractions to render to the page upon login
function initialSearch(req, res, next) {
  // The type of request
  const httpMethod = 'GET';

  const cityString = req.query.location;
  const array = cityString.split(' ');
  let city = array[0];
  for ( let i = 1; i < array.length; i++ ) {
    let newWord = array[i].trim();
    city += `+${newWord}`;
  }

  // Set parameters
  const userParams = {
    location: city,
  };

  // Set the require parameters here
  const requiredParams = {
    term: 'tourist_attractions',
    sort: '2',
    oauth_consumer_key: consumerKey,
    oauth_token: oauthToken,
    oauth_nonce: n(),
    oauth_timestamp: n().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
  };

  // Combine all the parameters in order of importance
  const parameters = _.assign(userParams, requiredParams);

  // Call on Yelp's Oauth 1.0a server, and it returns a signature
  // Note: This signature is only good for 300 seconds after oauth_timestamp
  const signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  // Add the signature to the list of parameters
  parameters.oauth_signature = signature;

  // The turn the poarameter's objects into a query string
  const paramURL = qs.stringify(parameters);

  // Add the query string to the url
  const apiURL = `${url}?${paramURL}`;

  // Then use fetch to send the API request
  fetch(apiURL)
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

// Code found at: https://arian.io/how-to-use-yelps-api-with-node/
// and help from Samuel Na!
// This function will keep searching for the initial location that the user
// searched for and will use their search term to refine the search
function searchAttractions(req, res, next) {
  // The type of request
  const httpMethod = 'GET';
  const find = req.query.term;
  console.log(find);

  const foo = find.split(',');
  console.log(foo);

  const searchWord = foo[0];
  console.log(searchWord);

  function useMaps(word) {
    fetch(`${SEARCH_URL}query=${word}&key=${API_KEY}`)
    .then(r => r.json())
    .then((result) => {
      console.log(result);
      return result.results[0].name;
    });
  }


  console.log(useMaps(searchWord));
  // Set parameters
  const userParams = {
    location: req.query.location,
    term: searchWord,
  };

  // Set the require parameters here
  const requiredParams = {
    oauth_consumer_key: consumerKey,
    oauth_token: oauthToken,
    oauth_nonce: n(),
    oauth_timestamp: n().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0',
  };

  // Combine all the parameters in order of importance
  const parameters = _.assign(userParams, requiredParams);

  // Call on Yelp's Oauth 1.0a server, and it returns a signature
  // Note: This signature is only good for 300 seconds after oauth_timestamp
  const signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  // Add the signature to the list of parameters
  parameters.oauth_signature = signature;

  // The turn the poarameter's objects into a query string
  const paramURL = qs.stringify(parameters);

  // Add the query string to the url
  const apiURL = `${url}?${paramURL}`;

  // Then use fetch to send the API request
  fetch(apiURL)
  .then(r => r.json())
  .then((result) => {
    res.search = result.businesses;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

//
module.exports = {
  getCity,
  keepCity,
  initialSearch,
  searchAttractions,
};
