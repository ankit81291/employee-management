/*jslint indent: 4 */

var mongoose = require('mongoose');
var Timesheet = mongoose.model('Timesheet');
var integration = require('./integration');

var sendJsonResponse = function (res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getCalendarEvents = function (req, res) {
    var eventsCollection = [];

    Timesheet.find().exec(function (err, results) {
        if (err) {
            throw err;
        }
        results.forEach(function (doc) {

            eventsCollection.push({
                'eventid': doc.timesheet_id,
                'worker_name': doc.worker,
                'task_name': doc.task,
                'start_time': doc.start_time,
                'end_time': doc.end_time,
                'duration': doc.duration,
                'details': doc.details
            });
        });

        sendJsonResponse(res, 200, eventsCollection);

    });
};