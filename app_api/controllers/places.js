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
            'Name': doc.name,
            'Address': doc.address,
            coords: doc.coords,
            'Organization': doc.organization,
            'Supervisor ID': doc.supervisor_id,
            'Supervisor Email': doc.supervisor_email,
            tasks: doc.tasks,
            workforce: doc.workforce
        });
    });
    return places;
};