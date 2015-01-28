/**
 * Created by taolin-pc on 1/21/15.
 */

var mongoose = require('mongoose');
var Staff = mongoose.model('Staff');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getStaffs = function(req, res) {
    var results = Staff.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
             var staffs = buildStaffsList(req, res, results);
            sendJsonResponse(res, 200, staffs);
        }
    })
}

var buildStaffsList = function(req, res, results) {
    var staffs = [];
    results.forEach(function(doc) {

        staffs.push({
            'first_name': doc.first_name,
            'Second_name': doc.second_name,
            'staff_id': doc.staff_id,
            'tag_id': doc.tag_id,
            'email': doc.email,
            'phone': doc.phone,
            'sex': doc.sex,
            'position': doc.position,
            'organization': doc.organization,
            tasks: doc.tasks,
            activities: doc.activities        });
    });
    return staffs;
}

module.exports.getNameList = function(req, res) {
    var results = Staff.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var staffs = buildNameList(req, res, results);
            sendJsonResponse(res, 200, staffs);
        }
    })
}

var buildNameList = function (req, res, results) {
    var staffnames = [];

    results.forEach(function (doc) {

        staffnames.push( {
            staff_id: doc.staff_id,
            staff_name: capitalize(doc.first_name) + '  ' + capitalize(doc.second_name),
            email: doc.email
        })
    });
    return staffnames;
};

function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}