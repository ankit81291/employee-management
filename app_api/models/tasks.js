var mongoose = require( 'mongoose' );

var workerSchema = new mongoose.Schema({
    worker_id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    sex: String,
    planned_start_time: {type: Date, "default": Date.now},
    start_time: {type: Date, "default": Date.now},
    planned_finish_time: {type: Date, "default": Date.now},
    finish_time: {type: Date, "default": Date.now},
    status: {type: String, required: true}
});

var placeSchema = {
    place_id: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    coords: {type: [Number], required: false},
    organization: {type: String, required: true}
};

var performanceSchema = {
    completion: {type: Number, "default": 0.0},
    equipment_available: {type: Number, "default": 0.0},
    workforce_available: {type: Number, "default": 0.0},
    material_available:  {type: Number, "default": 0.0}
};

var taskSchema = new mongoose.Schema({
    task_name: {type: String, required: true},
    task_id: {type: String, required: true},
    project_name: {type: String, required: true},
    planned_start_time: {type: Date, "default": Date.now},
    planned_finish_time: {type: Date, "default": Date.now},
    start_time: {type: Date, "default": Date.now},
    finish_time: {type: Date, "default": Date.now},
    status: {type: String, required: true},
    supervisor_id: String,
    supervisor_email: String,
    performance: performanceSchema,
    place: placeSchema,
    workforce: {type: [workerSchema], required: true}
});

mongoose.model('Task', taskSchema);
