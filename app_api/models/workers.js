/**
 * Created by taolin-pc on 12/4/14.
 */

var mongoose = require( 'mongoose' );

var skillSchema = new mongoose.Schema({
    skill: {type: String, required: true},
    level: Number
});

var taskSchema = new mongoose.Schema({
    task_name: {type: String, required: true},
    task_id: {type: String, required: true},
    project_name: {type: String, required: true}
});

var activitySchema = new mongoose.Schema({
    place: {type: String, required: true},
    timestamp: {type: Date, required: true},
    action: String,
    valid: Boolean
});

var workerSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    worker_id: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    sex: String,
    skills: {type: [skillSchema], required: true},
    tasks: {type: [taskSchema], required: true},
    activities: {type: [activitySchema], required: true}
});

mongoose.model('Worker', workerSchema);
