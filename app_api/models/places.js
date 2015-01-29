/**
 * Created by taolin-pc on 1/17/15.
 */

var mongoose = require( 'mongoose' );

var taskSchema = new mongoose.Schema({
    task_id: {type: String, required: true},
    task_name: {type: String, required: true},
    project_name: {type: String, required: true}
});

var workerSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    worker_id: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    task_id: {type: String, required: true},
    task_name: {type: String, required: true}
});

var placeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    place_id: {type: String, required: true},
    address: {type: String, required: true},
    coords: {type: [Number], required: false},
    orgnization: String,
    parent_place: String,
    supervisor_id: String,
    supervisor_email: String,
    tasks: {type: [taskSchema], required: true},
    workforce: {type: [workerSchema], required: true}
});

mongoose.model('Place', placeSchema);
