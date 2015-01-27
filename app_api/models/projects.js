/**
 * Created by taolin-pc on 12/4/14.
 */

var mongoose = require( 'mongoose' );

var taskSchema = new mongoose.Schema({
    task_id: {type: String, required: true},
    task_name: {type: String, required: true},
    planned_start_time: Date,
    planned_finish_time: Date,
    start_time: Date,
    finish_time: Date,
    status: {type: String, required: true},
    place_name: String,
    supervisor_id: {type: String, required: true}
});

var projectSchema = new mongoose.Schema({
    project_name: {type: String, required: true},
    project_id: {type: String, required: true},
    created_time: Date,
    planned_start_time: Date,
    planned_finish_time: Date,
    start_time: Date,
    finish_time: Date,
    status: {type: String, required: true},
    supervisor_id: {type: String, required: true},
    supervisor_email: {type: String, required: true},
    tasks: {type: [taskSchema], required: true}
});

mongoose.model('Project', projectSchema);
