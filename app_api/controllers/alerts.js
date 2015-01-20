var mongoose = require('mongoose');
var alert = mongoose.model('Alert');


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
		
		details.place = doc.place;
		details.reason = doc.reason;
		details.supervisor= doc.supervisor;
		details.supervisorId= doc.supervisorId;
		details.enterTime = doc.enterTime;
		details.task= doc.task;
		alertCollections.push({
			type: doc.type,
			created_time: doc.created_time,
			status: doc.status,
			project_name: doc.project_name,
			kind: doc.kind,
			alert_class:doc.alert_class,
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



/* PUT /api/alerts/:alertid */
module.exports.updateAlert = function(req, res) {
  if (!req.params.alertid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }
    	 var details ={};
		//console.log('Alerts document', doc);		
		details.place = req.params.place;
		details.reason = req.params.reason;
		details.supervisor= req.params.supervisor;
		details.supervisorId= req.params.supervisorId;
		details.enterTime = req.params.enterTime;
		details.task= req.params.task;
  
  tasks.update( 
  {_id: req.params.alertid},
  {
			type: req.params.type,
			created_time: req.params.created_time,
			status: req.params.status,
			project_name: req.params.project_name,
			kind:req.params.kind,
	        alert_class:req.params.alert_class,
			details: details
  },
  { multi: true }
  );
   sendJsonResponse(res, 200, {
      "message": "Successfully Updated"
    });
};  
  
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
