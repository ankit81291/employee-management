var mongoose = require('mongoose');

var tasks = mongoose.model('Task');

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
  tasks.create({
      task_name: req.body.task_name,
      task_id: req.body.task_id,
      project_name: req.body.project_name,
      planned_start_time: req.body.planned_start_time,
      planned_finish_time: req.body.planned_finish_time,
      start_time: req.body.start_time,
      finish_time:req.body.finish_time,
      status:req.body.status,
      supervisor_id: req.body.supervisor_id,
      performance: reg.body.performance,
      place: req.body.place,
      workforce: req.body.workforce
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
    var results = tasks.find().exec(function (err, results) {
        if (err) {
            throw err;
        } else {
            locations = buildTasksList(req, res, results);
            sendJsonResponse(res, 200, locations);
        }
/*
        results.forEach(function (doc) {

            tasks.push({
                task_name: doc.task_name,
                project_name: doc.project_name,
                planned_start_time: doc.planned_start_time,
                planned_finish_time: doc.planned_finish_time,
                start_time: doc.start_time,
                finish_time: doc.finish_time,
                status: doc.status
            });

            sendJsonResponse(res, 200, tasks_collection);
        }) */
    })
};


/* PUT /api/tasks/:taskname */
module.exports.updateTask = function(req, res) {
  if (!req.params.task_id) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }
	console.log(req.params);
  tasks.update(
  {task_id: req.params.task_id},
  {
		task_name: req.params.task_name,
        task_id: req.params.task_id,
		project_name: req.params.project_name,
		planned_start_time: req.params.planned_start_time,
		planned_finish_time: req.params.planned_finish_time,
		start_time: req.params.start_time,
		finish_time:req.params.finish_time,
		status:req.params.status,
        supervisor_id: "test123",
        supervisor_email: "test",
        performance: req.params.performance,
        place: req.params.place,
        workforce: req.params.workforce
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
          task_name: doc.task_name,
          task_id: doc.task_id,
          project_name: doc.project_name,
          planned_start_time: doc.planned_start_time,
          planned_finish_time: doc.planned_finish_time,
          start_time: doc.start_time,
          finish_time:doc.finish_time,
          status:doc.status,
          supervisor_id: doc.supervisor_id,
          supervisor_email: doc.supervisor_email,
          performance: doc.performance,
          place: doc.place,
          workforce: doc.workforce
        });
    });
  return tasks;
};


module.exports.getNameList = function(req, res) {
    var results = tasks.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var places = buildNameList(req, res, results);
            sendJsonResponse(res, 200, places);
        }
    })
}

module.exports.getPerformanceData = function(req, res) {
    var results = tasks.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var places = buildPerformanceData(req, res, results);
            sendJsonResponse(res, 200, places);
        }
    })
}

var buildPerformanceData = function(req, res, results) {
    var performElements = [];

    results.forEach(function (doc) {

        performElements.push( {
            task_name: doc.task_name,
            project_name: doc.project_name,
            location: doc.place.name,
            completion: doc.performance.completion,
            equipment_available: doc.performance.equipment_available,
            workforce_available: doc.performance.workforce_available,
            material_available: doc.performance.material_available
        })
    });
    return performElements;
};


var buildNameList = function (req, res, results) {
    var tasknames = [];

    results.forEach(function (doc) {

        tasknames.push( {
            task_name: doc.task_name
        })
    });
    return tasknames;
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