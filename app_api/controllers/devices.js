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
            'Device Name': doc.device_name,
            'Device ID': doc.device_id,
            'Device Type': doc.device_type,
            'Vendor': doc.vendor,
            'Place Name': doc.place_name,
            'Created Time': doc.created_time,
            'Status' : doc.status
        });
    });
    return devices;
};