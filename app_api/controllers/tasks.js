var mongoose = require('mongoose');

var Task = mongoose.model('Task');

var sendJsonResponse = function(res, status, content) {
  console.log(content);
  res.status(status);
  res.json(content);
};

/*module.exports.test = function (req, res) {
  sendJsonResponse(res, 200, {"status" : "success"});
};
*/

module.exports.createTask= function(req, res) {
  console.log(req.body);
  Task.create({
	task_name: req.body.task_name,
    project_name: req.body.project_name,
    planned_start_time: req.body.planned_start_time,
    planned_finish_time: req.body.planned_finish_time,
    start_time: req.body.start_time,
	finish_time:req.body.finish_time,
	status:req.body.status
  }, function(err, location) {
    if (err) {
      console.log(err);
      sendJsonResponse(res, 400, err);
    } else {
      console.log(location);
      sendJsonResponse(res, 201, location);
    }
  });
};


/* GET list of locations */
module.exports.getTasks = function(req, res) {
   var tasks_collection={};
   var results = tasks.find().exec(function(err, results){
	 if(err){
        throw err;
    } else {

         locations = buildTasksList(req, res, results);
         sendJsonResponse(res, 200, locations);
        results.forEach(function(doc){
          
	tasks.push({
		task_name: doc.task_name,
		project_name: doc.project_name,
		planned_start_time: doc.planned_start_time,
		planned_finish_time: doc.planned_finish_time,
		start_time: doc.start_time,
		finish_time:doc.finish_time,
		status:doc.status
	});
  });
	
	sendJsonResponse(res, 200,tasks_collection);
   };
  });
};


/* PUT /api/tasks/:taskname */
module.exports.updateTask = function(req, res) {
  if (!req.params.taskname) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }
  
  tasks.update( 
  {task_name: req.params.taskname},
  {
		task_name: req.params.task_name,
		project_name: req.params.project_name,
		planned_start_time: req.params.planned_start_time,
		planned_finish_time: req.params.planned_finish_time,
		start_time: req.params.start_time,
		finish_time:req.params.finish_time,
		status:req.params.status
  },
  { multi: true }
  );
   sendJsonResponse(res, 200, {
      "message": "Successfully Updated"
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