var mongoose = require('mongoose');

var Task = mongoose.model('Task');
var Place= mongoose.model('Place');
var Worker = mongoose.model('Worker');

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
    Place.findOne({'place_id': req.body.place.place_id}, function(err, place) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return console.error(err);
        }

        Worker.findOne({'worker_id': req.body.workforce[0].worker_id}, function(err, worker) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return console.error(err);
            }

            var task = createTaskObject(req, res, place, worker);
            addTaskToPlace(req, res, place, task, worker);
            sendJsonResponse(res, 201, "Task created.");
        })
    })
}

var createTaskObject;
createTaskObject = function (req, res, place, worker) {
    var po ={};
    po.name = place.name;
    po.place_id = place.place_id;
    po.address = place.address;
    po.organization = place.organization;
    po.coords = place.coords;
    if(place.parent_place !== undefined) {
        po.parent_place = place.parent_place;
    }

    var task = {};
    task["task_name"] = req.body.task_name;
    task["task_id"] = req.body.task_id;
    task["project_name"] = req.body.project_name;
    task["planned_start_time"] = req.body.planned_start_time;
    task["status"] = req.body.status;
    task["supervisor_id"] = req.body.supervisor_id;
    task["supervisor_email"] = req.body.supervisor_email;
    task["performance"] = req.body.performance;
    task["place"] = po;

    Task.create(task, function(err, obj) {
        if (err) {
            console.log(err);
            sendJsonResponse(res, 400, err);
        }
    });
    return task;
};

var addTaskToPlace = function(req, res, place, task, worker) {
    var tobj = {};
    tobj.task_id = task.task_id;
    tobj.task_name = task.task_name;
    tobj.project_name = task.project_name;

    var wobj = {};
    wobj.first_name = worker.first_name;
    wobj.second_name = worker.second_name;
    wobj.worker_id = worker.worker_id;
    wobj.tag_id = worker.tag_id;
    wobj.email = worker.email;
    wobj.phone = worker.phone;
    wobj.sex = worker.sex;
    wobj.task_id = task.task_id;
    wobj.task_name = task.task_name;
    wobj.status = task.status;

    place["tasks"].push(tobj);
    place["workforce"].push(wobj);

    place.save(function (err, place){
        if(err){
            sendJsonResponse(res, 400, err);
        } else {
            console.log('Place updated');
        } });
}

/* GET list of locations */
module.exports.getTasks = function(req, res) {
    var results = Task.find().exec(function (err, results) {
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
/*
 * 
 * db.products.update(
   { _id: 100 },
   { $set:
      {
        quantity: 500,
        details: { model: "14Q3", make: "xyz" },
        tags: [ "coats", "outerwear", "clothing" ]
      }
   }
)

db.people.findAndModify({
    query: { name: "Andy" },
    sort: { rating: 1 },
    update: { $inc: { score: 1 } },
    upsert: true
})
 */

/* PUT /api/tasks/:taskname */
module.exports.updateTask = function(req, res) {
	
	
  if (!req.body.task_id) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }

	Task.update({task_id:req.body.task_id}, {$set:
	{	
		task_name: req.body.task_name,	
        task_id: req.body.task_id,
		project_name: req.body.project_name,
        supervisor_id: req.body.supervisor_id,
        supervisor_email: req.body.supervisor_email
    }},
        
        function(err, result) {
	    if (err)
	        {
	    		console.log("Error"+err);
	        }
	    else{
	    	sendJsonResponse(res, 200, {
	    	      "message": "Successfully Updated"
	    	    });
	    }
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
    var results = Task.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var places = buildNameList(req, res, results);
            sendJsonResponse(res, 200, places);
        }
    })
}

module.exports.getPerformanceData = function(req, res) {
    var results = Task.find().exec(function(err, results){
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