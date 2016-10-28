
function buildMap(req, res, next) {
  res.lat = parseInt(req.query.lat);
  res.lng = parseInt(req.query.lng);
  next();
}


module.exports = { buildMap };
