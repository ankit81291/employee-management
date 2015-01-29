var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');
var integration = require('./integration');


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
			'alert_type': doc.alert_type,
      'reason': doc.reason,
      'created_time': doc.created_time,
      'status': doc.status,
      'place_name': doc.place_name,
      'details': doc.details
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
  if (!req.body.alertid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, locationid is required"
    });
    return;
  }

    if(req.body.action == "email") {

        sendAlertEmail(req, res);

        Alert.update(
            {_id: req.body.alertid},
            {
                alert_type: req.body.alert_type,
                reason: req.body.reason,
                created_time: req.body.created_time,
                status: req.body.status,
                place_name: req.body.place_name,
                details: req.body.details
            },
            {multi: true}
        );
        sendJsonResponse(res, 200, {
            "message": "Alert updated"
        })
    }
};

var sendAlertEmail = function(req, res) {

    if(req.body.alert_type == "RiskRegionEnter") {
        var detail = new Object();
        detail.first_name = req.body.first_name;
        detail.second_name = req.body.second_name;
        detail.worker_id = req.body.worker_id;
        detail.enter_time = req.body.enter_time;
        detail.supervisor_email = req.body.supervisor_email;

        var obj = new Object();
        obj.alert_type = req.body.alert_type;
        obj.reason = req.body.reason;
        obj.created_time = req.body.created_time;
        obj.status = req.body.status;
        obj.place_name = req.body.place_name;
        obj.details = detail;

        createRiskEnterRegionAlertEmail(req, res, obj);

        sendJsonResponse(res, 200, "RiskEnterRegion Alert Email sent");
    }
    else {
        sendJsonResponse(res, 404, "Wrong Alert Type");
    }
}

var createRiskEnterRegionAlertEmail = function(req, res, obj) {
    var body = '<b>Alert Type:  </b>' + req.body.alert_type + '<hr>';
    body = body + '<p><b>Reason: </b>' + 'A worker enters a region without permission' + '<\p>';
    body = body + '<p><b>Worker First Name: </b>' + req.body.details.worker_firstname + '<\p>';
    body = body + '<p><b>Worker Second Name: </b>' + req.body.details.worker_secondname + '<\p>';
    body = body + '<p><b>Worker ID: </b>' + req.body.details.worker_id + '<\p>';
    body = body + '<p><b>Place: </b>' + req.body.place_name + '<\p>';
    body = body + '<p><b>Enter Time: </b>' + req.body.details.enter_time + '<\p>';

    var to = 'Task Manager <' + req.body.details['Supervisor Email'] + '>';
    var from = 'Project Manager <sctest2004@gmail.com>';
    var subject = 'Worker Enter A Region without Permission';

    integration.sendEmail(body, from, to, subject);
}


  
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
