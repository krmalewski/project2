// create a route handler
const router = require('express').Router();

const mapModel = require('../models/maps');


// Set up our routes
router.get('/', mapModel.buildMap, (req, res) => {
  res.render('maps', {
    lat: res.lat,
    lng: res.lng,
  });
});


// router.get('/', mapModel.buildMap, (req, res) => {
//   res.send(res.lng);
// });


module.exports = router;
