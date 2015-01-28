/**
 * Created by taolin-pc on 1/21/15.
 */

var mongoose = require('mongoose');
var Project = mongoose.model('Project');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getProjects = function(req, res) {
    var results = Project.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
             var staffs = buildProjectsList(req, res, results);
            sendJsonResponse(res, 200, staffs);
        }
    })
}

var buildProjectsList = function(req, res, results) {
    var projects = [];
    results.forEach(function(doc) {

        projects.push({
            'project_name': doc.first_name,
            'project_id': doc.second_name,
            'created_time': doc.staff_id,
            'planned_start_time': doc.planned_start_time,
            'planned_finish_time': doc.planned_finish_time,
            'start_time': doc.start_time,
            'finish_time': doc.finish_time,
            'status': doc.status,
            'supervisor_id': doc.supervisor_id,
            'supervisor_email': doc.supervisor_email,
            tasks: doc.tasks
        });
    });
    return projects;
};

module.exports.getNameList = function(req, res) {
    var results = Project.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            var projects = buildNameList(req, res, results);
            sendJsonResponse(res, 200, projects);
        }
    })
}

var buildNameList = function (req, res, results) {
    var projectnames = [];

    results.forEach(function (doc) {

        projectnames.push( {
            project_name: doc.project_name,
            project_id: doc.project_id
        })
    });
    return projectnames;
};