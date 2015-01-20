/**
 * Created by taolin-pc on 12/5/14.
 */
var mongoose = require('mongoose');
var moment = require('moment');
var Alert = mongoose.model('Alert');
var Device = mongoose.model('Device');
var Worker = mongoose.model('Worker');
var Place = mongoose.model('Place');
var Task = mongoose.model('Task');


var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var CronJob = require('cron').CronJob;

/*
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

*/

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sctest2004@gmail.com',
    pass: 'Test2004'
  }
});

var sendJsonResponse = function(res, status, content) {
  console.log(content);
  res.status(status);
  res.json(content);
};

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

  var messagelist = [];
  var messages = req.body.messages;

  for(var i = 0; i < messages.length; i++) {
    var obj = new Object();
    obj.batch_id = req.body.batch_id;
    obj.carrier_id = req.body.carrier_id;
    obj.controller_id = req.body.controller_id;
    obj.send_time = req.body.timestamp;
    obj.message_id = messages[i].message_id;
    obj.device_id = messages[i].device_id;
    obj.valid = messages[i].valid;
    obj.type = messages[i].type;
    obj.tag = messages[i].tag;
    obj.created_time = messages[i].timestamp;
    messagelist.push(obj);
  };

// devicemessageBatch(messagelist);

    checkLateWorker();

  sendJsonResponse(res, 200, "");
};

var devicemessageBatch = function(messagelist) {
   for(var i = 0; i < messagelist.length; i++) {
     var obj = messagelist[i];
     processMessage(obj);
   };
};

var processMessage = function(mesObj) {
//   handleMessage(mesObj);
//    console.log(mesObj);
    Place.findOneAndUpdate({"name": "work site 23", "workforce.worker_id": "worker20150118223A"},
        { $set: {"workforce.$.status": "alerted"}}
        );
/*                               { "$push": {
     "workforce.$.status": 'alerted'
     }
     }*/
}

var handleMessage = function(mesObj) {
  Device.findOne({'device_id': mesObj.device_id}, function(err, deviceObj) {
    if (err) return console.error(err);
    if(deviceObj !== null) {
      Worker.findOne({'tag_id': mesObj.tag}, function(err, workerObj) {
            if (err) return console.error(err);
            if(workerObj !== null) {
              Place.findOne({'name': deviceObj.place_name}, function(err, placeObj) {
                    if (err) return console.error(err);
                    if(placeObj !== null) {
                        var worker = placeObj.workforce.filter(function (worker) {
                               return worker.worker_id === workerObj.worker_id;
                            }).pop();
                        if(worker !== null) {
                            if(worker.status === 'expected') {
                               // need to change the status
                            }
                        }
                        else {
                            // Generate RiskEnterRegion Alert

                        }
                        console.log(worker);
                    }
                  }
              )
            }
          }
      )
    }
  })
};

var checkLateWorker = function() {
    Place.find({}, function(err, places) {
        places.forEach(function(place) {
            var workforce = place.workforce;
            workforce.forEach(function(worker) {
                var expected_time = worker.planned_time;
                var m = moment(new Date());
                var p = moment(expected_time).add(10, 'second');
                if(m.isAfter(p)) {
                    Task.findOne({'task_id': worker.task_id}, function(err, task) {
                        if (err) return console.error(err);
                        if(task !== null && worker.status === 'expected') {
                            var obj = createWorkerLateAlert(place, worker, task);
                            createWorkerLateEmail(obj, task);
                            console.log(worker);
                            worker.status = 'alerted';
                            place.save(function (err, pl) {
                                if(err){
                                    console.log('Oh dear', err);
                                } else {
                                    console.log('place saved: ');
                                }
                            });
                        }
                    })
                }
            })
        })
    })
};

var createWorkerLateAlert = function(place, worker, task) {
    var detail = new Object();
    detail.place = place.name;
    detail.reason = "This worker enters to a work site without permission";
    detail.worker_firstname = worker.first_name;
    detail.worker_secondname = worker.second_name;
    detail.worker_id = worker.worker_id;
    detail.enter_time = new Date();
    detail.planned_start_time = task.planned_starttime;

    var obj = new Object();
    obj.alert_type = "workerlate";
    obj.created_time = new Date();
    obj.status = "open";
    obj.task_name = worker.task_name;
    obj.details = detail;

    createAlert(obj);
    return obj;
}

var createWorkerLateEmail = function(obj, task) {
    var body = '<b>Alert Type:  </b>' + obj.alert_type + '<hr>';
    body = body + '<p><b>Reason: </b>' + 'A worker is late for a task' + '<\p>';
    body = body + '<p><b>Task: </b>' + obj.task_name + '<\p>';
    body = body + '<p><b>Worker First Name: </b>' + obj.details.worker_firstname + '<\p>';
    body = body + '<p><b>Worker Second Name: </b>' + obj.details.worker_secondname + '<\p>';
    body = body + '<p><b>Worker ID: </b>' + obj.details.worker_id + '<\p>';
    body = body + '<p><b>Planned Start Time: </b>' + obj.details.planned_start_time + '<\p>';
    body = body + '<p><b>Enter Time: </b>' + obj.details.enter_time + '<\p>';
    body = body + '<p><b>Status: </b>' + obj.status + '<\p>';

    var to = 'Task Manager <' + task.supervisor_email + '>';
    var from = 'Project Manager <sctest2004@gmail.com>';
    var subject = 'Worker late for task';

    sendEmail(body, from, to, subject);
}

var sendEmail = function(body, from, to, subject) {
    var msg = {};
    msg.html = body;
    msg.from = from;
    msg.to = to;
    msg.subject = subject;

    transporter.sendMail(msg, function (err) {
        if (err) console.log('Sending to ' + msg.to + ' failed: ' + err);
    })
};

var createAlert = function(anode) {
    var alert = new Alert(anode);
    alert.save(function(err) {
        if (err) console.log(err);
        });
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

  //  createAlert(obj);
  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
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
  
  
//  createAlert(obj);

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

//  createAlert(obj);

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
  
//   createAlert(obj);


  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
};
