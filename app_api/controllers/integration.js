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
var Equip = mongoose.model('Equip');


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

 */

new CronJob('*/10 * * * * *', function(){
 checkLateWorker();
//  console.log('Generate task late alert');
}, null, true, "America/Los_Angeles");


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
    console.log("equipmentprocess");
    var obj = {};
    obj.batch_id = req.body.batch_id;
    obj.carrier_id = req.body.carrier_id;
    obj.controller_id = req.body.controller_id;
    obj.send_time = req.body.timestamp;
    obj.message_id = req.body.message_id;
    obj.device_id = req.body.device_id;
    obj.equipment_id = req.body.equipment_id;
    obj.status = req.body.type;
    obj.tag = req.body.tag;

    if(obj.status == 'not working') {
        handleEquipmentEvent(obj);
    }

    sendJsonResponse(res, 200, "Equipment Message Processed Successfully");
};

module.exports.deviceprocess = function(req, res) {

  var messagelist = [];
  var messages = req.body.messages;

  for(var i = 0; i < messages.length; i++) {
    var obj = {};
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
  }

    devicemessageBatch(messagelist);

    sendJsonResponse(res, 200, "Message processed successfully");
};

var devicemessageBatch = function(messagelist) {
   for(var i = 0; i < messagelist.length; i++) {
     var obj = messagelist[i];
       handleMessage(obj);
   }
};

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
                               console.log(worker);
                               return worker.worker_id === workerObj.worker_id;
                            }).pop();
                        if(worker == null && worker == undefined) {
                            createRiskEnterRegionAlert(placeObj, workerObj);
                        }
                        else {
                            console.log(worker);
                            if(worker.status === 'planned' || worker.status === 'alerted') {
                                worker.status = 'arrived';
                                place.save(function (err, pl) {
                                    if(err){
                                        console.log('Oh dear', err);
                                    } else {
                                        console.log('place saved: ');
                                    }
                                })
                            }
                        }
                    }
                  }
              )
            }
          }
      )
    }
  })
};

var createRiskEnterRegionAlert = function(place, worker) {
    var detail = {};
    detail["First Name"] = worker.first_name;
    detail["Second Name"] = worker.second_name;
    detail["Worker ID"] = worker.worker_id;
    detail["Enter Time"] = new Date();
    detail["Supervisor Email"] = place.supervisor_email;

    var obj = {};
    obj.alert_type = "RiskRegionEnter";
    obj.reason = "This worker enters to a work site without permission";
    obj.created_time = new Date();
    obj.status = "open";
    obj.place_name = place.name;
    obj.details = detail;

    createAlert(obj);
};

var checkLateWorker = function() {
    Place.find({}, function(err, places) {
        places.forEach(function(place) {
            var workforce = place.workforce;
            workforce.forEach(function(worker) {
                Task.findOne({'task_id': worker.task_id}, function(err, task) {
                        if (err) return console.error(err);

                        if(task !== null && task.status === 'planned') {
                            var expected_time = task.planned_start_time;
                            var m = moment(new Date());
                            var p = moment(expected_time).add(10, 'second');

                            if(m.isAfter(p)) {
                                var obj = createWorkerLateAlert(place, worker, task);
                                createWorkerLateEmail(obj, task);
                                task.update({status: "alerted"}, function (err, pl) {
                                    if(err){
                                        console.log('Oh dear', err);
                                    } else {
                                        console.log('Task saved: ');
                                }})
                            }
                            }
                    })
            })
        })
    })
};

var createWorkerLateAlert = function(place, worker, task) {
    var detail = {};
    detail.first_name = worker.first_name;
    detail.second_name = worker.second_name;
    detail.worker_id = worker.worker_id;
    detail.task_name = worker.task_name;
    detail.planned_start_time = task.planned_start_time;
    detail.supervisor_email = place.supervisor_email;

    var obj = {};
    obj.alert_type = "WorkerLate";
    obj.reason = "This worker is late for task: " + worker.task_name + "in " + place.name;
    obj.created_time = new Date();
    obj.status = "open";
    obj.place_name = place.name;
    obj.details = detail;

    createAlert(obj);

    return obj;
};


var createWorkerLateEmail = function(obj, task) {
    var body = '<b>Alert Type:  </b>' + obj.alert_type + '<hr>';
    body = body + '<p><b>Reason: </b>' + 'A worker is late for a task' + '<\p>';
    body = body + '<p><b>Task: </b>' + obj.details.task_name + '<\p>';
    body = body + '<p><b>Worker First Name: </b>' + obj.details.first_name + '<\p>';
    body = body + '<p><b>Worker Second Name: </b>' + obj.details.second_name + '<\p>';
    body = body + '<p><b>Worker ID: </b>' + obj.details.worker_id + '<\p>';
    body = body + '<p><b>Place: </b>' + obj.place_name + '<\p>';
    body = body + '<p><b>Planned Start Time: </b>' + obj.details.planned_start_time + '<\p>';
    body = body + '<p><b>Status: </b>' + obj.status + '<\p>';

    var to = 'Task Manager <' + task.supervisor_email + '>';
    var from = 'Project Manager <sctest2004@gmail.com>';
    var subject = 'Worker late for task';

    sendEmail(body, from, to, subject);
};

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

module.exports.sendEmail = function(body, from, to, subject) {
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


var generateEquipmentlateAlert = function() {
  var detail = {};
  detail["Equipment Name"] = "Croal";
  detail["Equipment ID"] = "11";
  detail["Task Name"] = "modeling";
    detail["Supervisor Email"] = "aron.william@gmail.com";

  var obj = {};
  obj.alert_type = "EquipmentLate";
    obj.reason = "Equipment is late for floor fixing task in Work Site 23";
  obj.created_time = new Date();
  obj.status = "open";
  obj.place_name = "Work Site 23";
  obj.details = detail;

  var jsonString= JSON.stringify(obj);
  console.log(jsonString);
  
  createAlert(obj);

};

var generateEquipmentmaintenanceAlert = function() {
  var detail = {};
  detail["Equipment Name"] = "Coral";
  detail["Equipment ID"] = "act11234122";
  detail["Repairer"] = "Cliff";
  detail["Repairer ID"] = "44f3eaeaf4";
  detail["Planned Start Time"] =  new Date(2014, 12, 03, 9, 39, 52, 808);
    detail["Planned Finish Time"] = new Date(2014, 12, 03, 11, 39, 52, 808);
    detail["Task Name"] = "Fix Engine";

    var obj = {};
    obj.alert_type = "EquipmentMaintenance";
    obj.reason = "This equipment is required to be maintained";
    obj.created_time = new Date();
    obj.status = "open";
    obj.place_name = "Work Site 23";
    obj.details = detail;

    console.log(obj);
  createAlert(obj);

};

var handleEquipmentEvent = function(obj) {
console.log("handleEquipmentEvent");
    Device.findOne({'device_id': obj.device_id}, function(err, deviceObj) {
        if (err) return console.error(err);
        if(deviceObj !== null) {
            Equip.findOne({'equipment_id': obj.equipment_id}, function(err, equipObj) {
                if (err) return console.error(err);
                if (equipObj !== null) {
                    generateEquipmentNotWorkingAlert(obj, equipObj);

                    equipObj.update({status: "not working"}, function (err, pl) {
                        if(err){
                            console.log('Oh dear', err);
                        } else {
                            console.log('Task saved: ');
                        }});

                    generateTasklateAlert(obj, equipObj);
                }
            })
        }
    })
}


var generateTasklateAlert = function(obj, equipObj) {
    var detail = {};
    detail.equipment_name = equipObj.equipment_name;
    detail.equipment_id = equipObj.equipment_id;
    detail.task = equipObj.tasks[0].task_name;

    var obj1 = {};
    obj1.alert_type = "TaskLate";
    obj1.reason = "Potential task late caused by Equipment Name: " + equipObj.equipment_name + " Equipment ID: " + equipObj.equipment_id;
    obj1.created_time = new Date();
    obj1.status = "Open";
    obj1.place_name = equipObj.place.name;
    obj1.details = detail;
  
    createAlert(obj1);
};

var generateEquipmentNotWorkingAlert = function(obj, equipObj) {
    var detail = {};
    detail.equipment_name = equipObj.equipment_name;
    detail.equipment_id = equipObj.equipment_id;
    detail.task = equipObj.tasks[0].task_name;

    var obj1 = {};
    obj1.alert_type = "EquipmentNotWorking";
    obj1.reason = "Equipment has issue. Equipment Name: " + equipObj.equipment_name + " Equipment ID: " + equipObj.equipment_id;
    obj1.created_time = obj.send_time;
    obj1.status = "Open";
    obj1.place_name = equipObj.place.name;
    obj1.details = detail;
    createAlert(obj1);
}
