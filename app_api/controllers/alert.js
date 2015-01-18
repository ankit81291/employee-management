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

/*
.exec(function(err, results){
    if(err){
        throw err
    } else {
        results.forEach(function(docs){
            newcollection.insert(docs)
        })
    }
});*/


/*

{ __v: 0,
  alert_type: 'riskregionenter',
  created_time: Sun Jan 18 2015 17:04:00 GMT+0530 (India Standard Time),
  status: 'open',
  project_name: 'home garden',
  details:
   { task: 'modeling',
     send_time: Sun Jan 18 2015 17:04:00 GMT+0530 (India Standard Time),
     enter_time: Sun Jan 18 2015 17:04:00 GMT+0530 (India Standard Time),
     worker_id: '124343432343df3',
     worker_name: 'Adi',
     reason: 'high risk task has scheduled in this region at 9:40am',
     place: 'region 1' },
  _id: 54bb9a28e20085981b9ff5b6 }
  */
  
/* GET list of locations */
module.exports.getAlerts = function(req, res) {
   var alerts;
   var alertCollections = [];

   var results = alert_model.find().exec(function(err, results){
    if(err){
        throw err;
    } else {
        results.forEach(function(doc){
           //console.log('Alerts document', docs);
		 var details ={};
		//console.log('Alerts document', doc);
		
		details.place = doc.details.place;
		details.reason = doc.details.reason;
		details.supervisor= doc.details.worker_name;
		details.supervisorId= doc.details.worker_id;
		details.enterTime = doc.details.enter_time;
		details.send_time = doc.details.send_time;
		details.task= doc.details.task;
  
		alertCollections.push({
			type: doc.alert_type,
			created_time: doc.created_time,
			status: doc.status,
			project_name: doc.project_name,
			details: details
			});
        })
    }
	sendJsonResponse(res, 200, alertCollections);
	
});
    console.log('Alerts Results', results);
     /*if (err) {
      console.log('geoNear error:', err);
      sendJsonResponse(res, 404, err);
    } else */{
     // locations = buildAlertsList(req, res, results);
     // sendJsonResponse(res, 200, locations);
    }
  }


module.exports.getAlert = function(req, res) {   
   console.log('Finding location details', req.params);
  if (req.params && req.params.alerttype) {
    var results = alert_model.find({type: req.params.alerttype});
    console.log('Alerts Results', results);
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
