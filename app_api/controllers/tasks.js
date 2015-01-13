var mongoose = require('mongoose');
var tasks = mongoose.model('Tasks');


var sendJsonResponse = function(res, status, content) {
  console.log(content);
  res.status(status);
  res.json(content);
};

/*module.exports.test = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
*/

/* GET list of locations */
module.exports.getTasks = function(req, res) {
   var locations;
   var results = tasks.find();
    console.log('tasks Results', results);
     if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else {
      locations = buildTasksList(req, res, results);
      sendJsonResponse(res, 200, locations);
    }
  });
};

var buildTasksList = function(req, res, results) {
var tasks = [];
results.forEach(function(doc) {
  tasks.push({
    task_name: doc.obj.task_name,
    project_name: doc.obj.project_name,
    planned_start_time: doc.obj.planned_start_time,
    planned_finish_time: doc.obj.planned_finish_time,
    start_time: doc.obj.start_time,
	finish_time:doc.obj.finish_time,
	status:doc.obj.status
  });
});
  return tasks;
};


/*

var mongoose = require( 'mongoose' );

var workerSchema = new mongoose.Schema({
    worker_id: mongoose.Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    sex: String
});

var taskSchema = new mongoose.Schema({
    task_name: {type: String, required: true},
    project_name: {type: String, required: true},
    planned_start_time: {Date, "default": Date.now},
    planned_finish_time: {Date, "default": Date.now},
    start_time: {Date, "default": Date.now},
    finish_time: {Date, "default": Date.now},
    status: {type: String, required: true},
    place: {
        name: {type: String, required: true},
        address: {type: String, required: true},
        coords: {type: [Number], required: true},
        orgnization: String
    },
    worker_history: {type: [workerSchema], required: true}
});

mongoose.model('Task', taskSchema);

*/