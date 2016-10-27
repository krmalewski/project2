/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint key-spacing: ["error", { align: "value" }] */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

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

// This function will find the city the user wants to search for
// and send it to the explore page
function getCity(req, res, next) {
  res.city = req.body.city;
  next();
}


// Code found at: https://arian.io/how-to-use-yelps-api-with-node/
// and help from Samuel Na!
// This function will get the city that the user searched on the login
// page and input that as the userParams. This will allow the initial
// tourist attractions to render to the page upon login
function initialSearch(req, res, next) {
  // The type of request
  const httpMethod = 'GET';

  // Set parameters
  const userParams = {
    location: req.query.location
  };
  console.log(userParams);

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
  console.log(parameters);

  // Call on Yelp's Oauth 1.0a server, and it returns a signature
  // Note: This signature is only good for 300 seconds after oauth_timestamp
  const signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  // Add the signature to the list of parameters
  parameters.oauth_signature = signature;

  // The turn the poarameter's objects into a query string
  const paramURL = qs.stringify(parameters);

  // Add the query string to the url
  const apiURL = `${url}?${paramURL}`;
  console.log(apiURL);

  // Then use fetch to send the API request
  fetch(apiURL)
  .then(r => r.json())
  .then((result) => {
    res.attractions = result.businesses;
    console.log(res.yelp)
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

//
module.exports = {
  initialSearch,
  getCity,
};
