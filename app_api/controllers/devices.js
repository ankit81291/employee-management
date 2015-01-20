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