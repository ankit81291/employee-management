/**
 * Created by taolin-pc on 1/17/15.
 */

var mongoose = require('mongoose');
var Device = mongoose.model('Device');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getDevices = function(req, res) {
    var results = Device.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            devices = buildDevicesList(req, res, results);
            sendJsonResponse(res, 200, devices);
        }
    })
}

var buildDevicesList = function(req, res, results) {
    var devices = [];
    results.forEach(function(doc) {

        devices.push({
            device_name: doc.device_name,
            device_id: doc.device_id,
            device_type: doc.device_type,
            vendor: doc.vendor,
            place_name: doc.place_name,
            created_time: doc.created_time,
            status : doc.status
        });
    });
    return devices;
};