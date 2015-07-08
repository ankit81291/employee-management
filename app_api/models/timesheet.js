/*jslint indent: 4 */

var mongoose = require('mongoose');


var timesheetSchema = new mongoose.Schema({
    worker: {type: String, required: true},
    task: {type: String, required: true},
    start_time: {type: Date},
    end_time: {type: Date},
    duration: {type: Number},
    timesheet_id: {type: String, required: true}
});

mongoose.model('Timesheet', timesheetSchema);