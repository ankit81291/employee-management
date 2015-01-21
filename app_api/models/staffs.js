/**
 * Created by taolin-pc on 12/4/14.
 */

var mongoose = require( 'mongoose' );

var taskSchema = new mongoose.Schema({
    task_name: {type: String, required: true},
    project_name: {type: String, required: true},
    planned_start_time: Date,
    planned_finish_time: Date,
    start_time: Date,
    finish_time: Date,
    status: {type: String, required: true},
    place: String
});

var activitySchema = new mongoose.Schema({
    place: {type: String, required: true},
    timestamp: {type: Date, required: true},
    action: String,
    valid: Boolean,
    sex: String
});

var staffSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    sex: String,
    position: {type: String, required: true},
    organization: {type: String, required: true},
    tasks: {type: [taskSchema], required: true},
    activities: {type: [activitySchema], required: true}
});

mongoose.model('Staff', staffSchema);