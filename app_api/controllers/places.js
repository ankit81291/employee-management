/**
 * Created by taolin-pc on 1/17/15.
 */

var mongoose = require('mongoose');
var Place = mongoose.model('Place');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

/* GET list of places */
module.exports.getPlaces = function(req, res) {
    var results = Place.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var places = buildPlacesList(req, res, results);
            sendJsonResponse(res, 200, places);
        }
    })
}

var buildPlacesList = function(req, res, results) {
    var places = [];
    results.forEach(function(doc) {

        places.push({
            name: doc.name,
            place_id: doc.place_id,
            address: doc.address,
            coords: doc.coords,
            organization: doc.organization,
            supervisor_id: doc.supervisor_id,
            supervisor_email: doc.supervisor_email,
            tasks: doc.tasks,
            workforce: doc.workforce
        });
    });
    return places;
}

module.exports.getNameList = function(req, res) {
    var results = Place.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var places = buildNameList(req, res, results);
            sendJsonResponse(res, 200, places);
        }
    })
}

var buildNameList = function (req, res, results) {
    var placenames = [];

    results.forEach(function (doc) {

        placenames.push( {
            name: doc.name,
            place_id: doc.place_id
        })
    });
    return placenames;
};
