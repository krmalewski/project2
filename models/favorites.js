/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
/* eslint new-cap: ["error", { "capIsNew": false }]*/
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint guard-for-in: "error"*/
/* eslint no-restricted-syntax: ["forInStatement"] */

const { ObjectID } = require('mongodb');
const { getDB }    = require('../lib/dbConnect.js');


// When we select an attraction from our explore.ejs page, this will
// insert it into our favorites collection
// Code adopted from itunes_crud_lab by Bobby King @gittheking
function saveFavorite(req, res, next) {
  // creating an empty object for the insertObj
  const insertObj = {};

  // copying all of req.body into insertObj
  for (let key in req.body) {
    insertObj[key] = req.body[key];
  }

  // Adding userId to insertObj
  insertObj.favorite.userId = req.session.userId;

  getDB().then((db) => {
    db.collection('favorites')
    .insert(insertObj.favorite, (insertErr, result) => {
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
// Code adopted from itunes_crud_lab by Bobby King @gittheking
function getFavorites(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
    .find({ userId: { $eq: req.session.userId } })
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
// Code adopted from itunes_crud_lab by Bobby King @gittheking
function deleteFavorites(req, res, next) {
  getDB().then((db) => {
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

// Code adopted from tom-cruise-movie-db by Rafa Pacas aka @rapala61
function getAttraction(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
    .findOne({ _id: ObjectID(req.params.id) }, (findErr, result) => {
      if (findErr) return next(findErr);

      res.attraction = result,
      db.close();
      return next();
    });
    return false;
  });
  return false;
}

// Code adopted from tom-cruise-movie-db by Rafa Pacas aka @rapala61
function editAttraction(req, res, next) {
  getDB().then((db) => {
    db.collection('favorites')
    .findAndModify({ _id: ObjectID(req.params.id) }, [],
      { $set: req.body.item }, { new: true }, (updateError, doc) => {
        if (updateError) return next(updateError);

        res.updated = doc;
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
  getAttraction,
  editAttraction,
};

