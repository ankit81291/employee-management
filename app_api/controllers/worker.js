var mongoose = require('mongoose');
var workers_model = mongoose.model('Worker');


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
module.exports.getWorkers = function(req, res) {
   var alerts;
   var results = workers_model.find();
    console.log('tasks Results', results);
     if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else {
      locations = buildWorkersList(req, res, results);
      sendJsonResponse(res, 200, locations);
    }
  });
};

var buildWorkersList = function(req, res, results) {
var workers = [];
results.forEach(function(doc) {
  var skillSchema ={};
  skillSchema.skill = doc.obj.skills.skill;
  skillSchema.number = doc.obj.skills.level;
  
  workers.push({
    first_name: doc.obj.first_name,
    second_name: doc.obj.second_name,
    tag_id: doc.obj.tag_id,
    email: doc.obj.email,
	phone: doc.obj.phone,
	sex: doc.obj.sex,
	skills : skillSchema
  });
});
  return workers;
};


/*


var skillSchema = new mongoose.Schema({
    skill: {type: String, required: true},
    level: Number
});

var taskSchema = new mongoose.Schema({
    task_id: mongoose.Schema.ObjectId,
    task_name: {type: String, required: true},
    project_name: {type: String, required: true},
    planned_start_time: Date,
    planned_finish_time: Date,
    start_time: Date,
    finish_time: Date,
    status: {type: String, required: true},
    place: String
});

var activitySchema = new mongoose.Schema({
    place: {type: String, required: true},
    timestamp: {type: Date, required: true},
    action: String,
    valid: Boolean,
    sex: String
});

var workerSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    second_name: {type: String, required: true},
    tag_id: {type: String, required: true},
    email: String,
    phone: String,
    sex: String,
    skills: {type: [skillSchema], required: true},
    tasks: {type: [taskSchema], required: true},
    activities: {type: [activitySchema], required: true}
});
*/
