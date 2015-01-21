/**
 * Created by taolin-pc on 1/21/15.
 */

var mongoose = require( 'mongoose' );

var taskSchema = new mongoose.Schema({
    task_id: {type: String, required: true},
    task_name: {type: String, required: true},
    project_name: {type: String, required: true},
    planned_start_time: {type: Date, "default": Date.now},
    start_time: {type: Date, "default": Date.now},
    expected: {type: String, required: true},
    status: {type: String, required: true}
});

var workerSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    worker_id: {type: String, required: true},
    tag_id: {type: String, required: true},
    status: {type: String, required: true},
    email: String,
    phone: String,
    task_id: {type: String, required: true},
    task_name: {type: String, required: true},
    planned_time: {type: Date, "default": Date.now},
    start_time: {type: Date, "default": Date.now}
});

var equipSchema = new mongoose.Schema({
    equipment_name: {type: String, required: true},
    equipment_id: {type: String, required: true},
    equipment_type: {type: String, required: true},
    commercial_type: {type: String, required: true},
    vendor: {type: String},
    place_name: {type: String, required: true},
    created_time: {type: Date, required: true},
    status: {type: String, required: true},
    tasks: {type: [taskSchema], required: true},
    workforce: {type: [workerSchema], required: true}
});

mongoose.model('Equip', equipSchema);