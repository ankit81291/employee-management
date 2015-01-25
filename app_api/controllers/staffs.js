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
            'First Name': doc.first_name,
            'Second Name': doc.second_name,
            'Staff ID': doc.staff_id,
            'Tag ID': doc.tag_id,
            'Email': doc.email,
            'Phone': doc.phone,
            'Sex': doc.sex,
            'Position': doc.position,
            'Organization': doc.organization,
            tasks: doc.tasks,
            activities: doc.activities        });
    });
    return staffs;
};