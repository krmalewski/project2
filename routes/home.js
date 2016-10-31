/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint new-cap: ["error", { "capIsNew": false }]*/

// create a route handler
const express       = require('express');

const indexRouter   = express.Router();

// Set up our routes

// This route serves as the homepage
indexRouter.get('/', (req, res) => {
  res.render('index');
});

// This route serves your `/login` form
indexRouter.get('/login', (req, res) => {
  res.render('login');
});

// This route serves your `/signup` form
indexRouter.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = indexRouter;
