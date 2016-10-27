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

// Code found at: https://arian.io/how-to-use-yelps-api-with-node/
// and help from Samuel Na!
function requestYelp(req, res, next) {
  // The type of request
  const httpMethod = 'GET';

  // Set parameters
  const userParams = req.body.term;

  console.log(req.body);

  // Set the require parameters here
  const requiredParams = {
    sort: '2',
    oauth_consumer_key: process.env.oauth_consumer_key,
    oauth_token: process.env.oauth_token,
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
  fetch(apiURL, (error, response, body) => {
    return callback(error, response, body);
  });
}

module.exports = { requestYelp };
