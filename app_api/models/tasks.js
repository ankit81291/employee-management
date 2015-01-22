var mongoose = require( 'mongoose' );

var workerSchema = new mongoose.Schema({
    worker_id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    sex: String,
    start_time: {type: Date, "default": Date.now},
    finish_time: {type: Date, "default": Date.now},
    status: {type: String, required: true}
});

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
    place: {
        name: {type: String, required: true},
        address: {type: String, required: true},
        coords: {type: [Number], required: true},
        orgnization: String
    },
    workforce: {type: [workerSchema], required: true}
});

mongoose.model('Task', taskSchema);
