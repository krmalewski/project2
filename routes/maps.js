// create a route handler
const router = require('express').Router();

const mapService = require('../services/maps');


// Set up our routes
router.get('/', mapService.buildMap, (req, res) => {
  res.render('maps', {
    map: res.map,
  });
});

module.exports = router;
