/**
 * Created by taolin-pc on 12/5/14.
 */
var mongoose = require('mongoose');
var Alert = mongoose.model('Alert');
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var email = require('emailjs');
var CronJob = require('cron').CronJob;

new CronJob('0 * * * * 0-6', function(){
  generateWorkerlateAlert();
  console.log('Generate worker late alert');
}, null, true, "America/Los_Angeles");

new CronJob('0 * * * * 0-6', function(){
  generateEquipmentlateAlert();
  console.log('Generate equipment late alert');
}, null, true, "America/Los_Angeles");

new CronJob('0 * * * * 0-6', function(){
  generateRiskRegionAlert();
  console.log('Generate task late alert');
}, null, true, "America/Los_Angeles");

/*
new CronJob('* * * * * *', function(){
	 generateRiskRegionAlert();
    console.log('You will see this message every second');
}, null, true, "America/Los_Angeles");
*/

var server     = email.server.connect({
   user: 'divpratim@gmail.com',
   pass: 'Boadmin123',
   host: "smtp.gmail.com", 
   ssl:  true,
   port: 465
});


var message    = {
   text:    "i hope this works", 
   from:    "<YYY> prasanna.mavinakuli@gmail.com", 
   to:       "<YYY> prasanna.mavinakuli@gmail.com",
   cc:      "",  
   subject:    "testing emailjs"
};


var sendJsonResponse = function(res, status, content) {
  console.log(content);
  res.status(status);
  res.json(content);
};


var transport = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'prasanna.mavinakuli@gmail.com',
        pass: 'Srirama!#4757'
    }
}));

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'prasanna.mavinakuli@gmail.com',
        pass: 'Srirama!#4757'
    }
});

var mailOptions = {
    from: '<prasanna.mavinakuli@gmail.com>', // sender address
    to: '<prasanna.mavinakuli@gmail.com>', // list of receivers
    subject: 'Hello ?', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object


var createAlert = function(anode) {
  var alert = new Alert(anode);
  alert.save(function(err) {  
    if (err) {
      console.log(err);
    } else {
      console.log(alert);
	// send the message and get a callback with an error or details of the message that was sent
	//server.send(message, function(err, message) { console.log(err || message); });
	// send mail with defined transport object
	/*transport.sendMail(mailOptions, function(error, response){
    if(error){
		console.log("Boo!!!!");
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }});
};
});*/
}});;
}

module.exports.equipmentprocess = function(req, res) {
  var obj = new Object();
  
  /*
  obj.batch_id = req.body.batch_id;
  obj.carrier_id = req.body.carrier_id;
  obj.controller_id = req.body.controller_id;
  obj.send_time = req.body.timestamp;
  obj.message_id = req.body.message_id;
  obj.device_id = req.body.device_id;
  obj.equipment_id = req.body.equipment_id;
  obj.tag = req.body.tag;
  obj.created_time = req.body.timestamp;
  obj.equipment_id = req.body.equipment_id;
  obj.created_time = req.body.created_time;
  */
  
  obj.batch_id = "12345";
  obj.carrier_id = "45678";
  obj.controller_id = "12345";
  obj.send_time = new Date();
  
  obj.message_id = "12345";
  obj.device_id = "34567";
  obj.equipment_id = "12345";
  obj.tag = "tag";
  obj.created_time = new Date();
  obj.equipment_id = "12345";
  obj.created_time = new Date();
  
  var messages = {};
  var jsonString= JSON.stringify(obj);
  console.log(jsonString);

  generateEquipmentmaintenanceAlert(obj);

  sendJsonResponse(res, 200, "");
};

module.exports.deviceprocess = function(req, res) {
  var obj = new Object();
  var messagelist = [];
  /*
  obj.batch_id = req.body.batch_id;
  obj.carrier_id = req.body.carrier_id;
  obj.controller_id = req.body.controller_id;
  obj.send_time = req.body.timestamp;
  var messages = req.body.messages;
  */
  
  obj.batch_id = "12345";
  obj.carrier_id = "45678";
  obj.controller_id = "12345";
  obj.send_time = new Date();
  var messages = {};
  

  for(var i = 0; i < messages.length; i++) {
    obj.message_id = messages[i].message_id;
    obj.device_id = messages[i].device_id;
    obj.valid = messages[i].valid;
    obj.tag = messages[i].tag;
    obj.created_time = messages[i].timestamp;
    messagelist.push(obj);
  }

  devicemessageprocess(messagelist);

  sendJsonResponse(res, 200, "");
};

var devicemessageprocess = function(messagelist) {
   var obj = messagelist[0];
  generateRiskRegionAlert(obj);
};

var generateRiskRegionAlert = function(mesObj) {
  var detail = new Object();
  detail.place = "region 1";
  detail.reason = "high risk task has scheduled in this region at 9:40am";
  detail.worker_name = "Adi";
  detail.worker_id = "124343432343df3";
  detail.enter_time = new Date();
  detail.send_time = new Date();
  
  detail.task = "modeling";

  var obj = new Object();
  obj.alert_type = "riskregionenter";
  obj.created_time = new Date();
  obj.status = "open";
  obj.project_name = "home garden";
  obj.details = detail;

  createAlert(obj);
};

var generateWorkerlateAlert = function() {
  var detail = new Object();
  detail.place = "region 1";
  detail.reason = "This worker has not shown up 20 minutes after work start";
  detail.worker_name = "Ali";
  detail.workerId = "124343432343df3";
  detail.enter_time = new Date();
  detail.task = "modeling";

  var obj = new Object();
  obj.alert_type = "workerlate";
  obj.created_time = new Date();
  obj.status = "open";
  obj.project_name = "home garden";
  obj.details = detail;

  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
  
  
  createAlert(obj);

};

var generateEquipmentlateAlert = function(equipObj) {
  var detail = new Object();
  detail.place = "Region 1";
  detail.reason = "Equipment has not shown up 20 minutes work start";
  detail.equipment_name = "Croal";
  detail.equipment_id = "11";
  detail.task = "modeling";

  var obj = new Object();
  obj.alert_type = "equipmentlate";
  obj.created_time = new Date();;
  obj.status = "open";
  obj.project_name = "home garden";
  obj.details = detail;

  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
  
  
  createAlert(obj);

};

var generateEquipmentmaintenanceAlert = function(equipObj) {
  var detail = new Object();
  detail.place = "region 1";
  detail.reason = "This equipment is required to be maintained";
  detail.equipment_name = "Coral";
  detail.equipment_id = "12";
  detail.repairer = "Cliff";
  detail.repairer_id = "44f3eaeaf4";
  detail.scheduled_time =  new Date(2014, 12, 03, 9, 39, 52, 808);
  detail.estimated_time = "2 hours";
  detail.task = "modeling";

  var obj = new Object();
  obj.alert_type = "equipmentmaintenance";
  obj.created_time = new Date();
  obj.status = "open";
  obj.project_name = "home garden";
  obj.details = detail;

  createAlert(obj);

  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
};

var generateTasklateAlert = function() {
  var detail = new Object();
  detail.place = "region 1";
  detail.reason = "No enough materials";
  detail.supervisor = "Bado";
  detail.supervisor_id = "3254543543542";
  detail.enter_time =  new Date(2014, 12, 03, 9, 39, 52, 808);
  detail.task = "modeling";

  var obj = new Object();
  obj.alert_type = "tasklate";
  obj.created_time = new Date();
  obj.status = "open";
  obj.project_name = "home garden";
  obj.details = detail;
  
   createAlert(obj);


  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
};
