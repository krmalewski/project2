const { MongoClient } = require('mongodb');
const { ObjectID } = require('mongodb');

const dbConnection = 'mongodb://localhost:27017/yelp-search';

// When we select an attraction from our explore.ejs page, this will
// insert it into our favorites collection
// Code adopted from itunes_crud_lab
function saveFavorite(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);

    db.collection('favorites')
    .insert(req.body.favorite, (insertErr, result) => {
      if (insertErr) return next(insertErr);
      res.saved = result;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

// This funtion will search through my yelp-search DB to find any docs
// in the favorites collection.
// Any data retrieved from the db will be savec and passed on in res.favorite
// Code adopted from itunes_crud_lab
function getFavorites(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);
    db.collection('favorites')
    .find({})
    .toArray((arrayError, data) => {
      if (arrayError) return next(arrayError);
      res.favorite = data;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

// This function will find a document within our mongodb with a matching
// id to the attraction the user selected to delete and remove it from the db
// Code adopted from itunes_crud_lab
function deleteFavorites(req, res, next) {
  MongoClient.connect(dbConnection, (err, db) => {
    if (err) return next(err);
    db.collection('favorites')
    .findAndRemove({ _id: ObjectID(req.params.id) }, (removeErr, results) => {
      if (removeErr) return next(removeErr);
      res.removed = results;
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

module.exports = {
  saveFavorite,
  getFavorites,
  deleteFavorites,
};

