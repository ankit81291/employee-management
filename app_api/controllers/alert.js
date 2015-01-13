var mongoose = require('mongoose');
var alert_model = mongoose.model('Alert');


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
module.exports.getAlerts = function(req, res) {
   var alerts;
   var results = alert_model.find();
    console.log('tasks Results', results);
     if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else {
      locations = buildAlertsList(req, res, results);
      sendJsonResponse(res, 200, locations);
    }
  }


module.exports.getAlert = function(req, res) {   
   console.log('Finding location details', req.params);
  if (req.params && req.params.alerttype) {
    var results = alert_model.find({type: req.params.alerttype});
    console.log('tasks Results', results);
     if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else {
      locations = buildAlertsList(req, res, results);
      sendJsonResponse(res, 200, locations);
    }
  }
};


var buildAlertsList = function(req, res, results) {
var alerts = [];
results.forEach(function(doc) {

  var details ={};
  details.place = doc.obj.place;
  details.reason = doc.obj.reason;
  details.supervisor= doc.obj.supervisor;
  details.supervisorId= doc.obj.supervisorId;
  details.enterTime = doc.obj.enterTime;
  details.task= doc.obj.task;
  
  alerts.push({
    type: doc.obj.type,
    created_time: doc.obj.created_time,
    status: doc.obj.status,
    project: doc.obj.project,
	details: details
  });
});
  return alerts;
};


/*

var alertsSchema = new mongoose.Schema({
	type: {type: String, required: true},
	created_time: { type: Date, default: Date.now },
	status: {type: String, default:"Open"},
	project: {type: String, default: "Project"},
	details: {
		place: {type: String},
		reason: {type: String},
		supervisor: {type: String},
		supervisor_id: {Schema.Types.ObjectId},
		enter_time: { type: Date, default: Date.now },
		task: {type: String},
		}
	});
*/
