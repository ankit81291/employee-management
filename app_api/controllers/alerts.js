var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');


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
   var alertCollections = [];

   var results = Alert.find().exec(function(err, results){
    if(err){
        throw err;
    } else {
        results.forEach(function(doc){

		alertCollections.push({
			alert_type: doc.alert_type,
            reason: doc.reason,
			created_time: doc.created_time,
			status: doc.status,
			place_name: doc.place_name,
			details: doc.details
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
  
  tasks.update( 
  {_id: req.params.alertid},
  {
			alert_type: req.params.alert_type,
            reason: req.params.reason,
			created_time: req.params.created_time,
			status: req.params.status,
			place_name: req.params.place_name,
			details: req.params.details
  },
  { multi: true }
  );
   sendJsonResponse(res, 200, {
      "message": "Successfully Updated"
    });
};  
  
module.exports.getAlert = function(req, res) {   
  if (req.params && req.params.alerttype) {
    var results = alert_model.find({type: req.params.alert_type});
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
  
  alerts.push({
      alert_type: doc.alert_type,
      reason: doc.reason,
      created_time: doc.created_time,
      status: doc.status,
      place_name: doc.place_name,
      details: doc.details
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
