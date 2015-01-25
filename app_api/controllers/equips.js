/**
 * Created by taolin-pc on 1/21/15.
 */
var mongoose = require('mongoose');
var Equipment = mongoose.model('Equip');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getEquipments = function(req, res) {
    var results = Equipment.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            equips = buildEquipmentsList(req, res, results);
            sendJsonResponse(res, 200, equips);
        }
    })
}

var buildEquipmentsList = function(req, res, results) {
    var equipments = [];
    results.forEach(function(doc) {

        equipments.push({
            'Equipment Name': doc.equipment_name,
            'Equipment ID': doc.equipment_id,
            'Equipment Type': doc.equipment_type,
            'Vendor': doc.vendor,
            'Commercial Type': doc.commercial_type,
            'Place Name': doc.place_name,
            'Created Time': doc.created_time,
            'Status': doc.status,
            'tasks': doc.tasks,
            'workforce' : doc.workforce
        });
    });
    return equipments;
};