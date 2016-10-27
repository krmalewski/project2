// create a route handler
const router = require('express').Router();

// Set up our routes
router.get('/', (req, res) => {
  res.render('explore');
});

module.exports = router;
