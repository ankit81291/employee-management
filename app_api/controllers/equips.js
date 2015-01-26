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
            'equipment_name': doc.equipment_name,
            'equipment_id': doc.equipment_id,
            'equipment_type': doc.equipment_type,
            'vendor': doc.vendor,
            'commercial_type': doc.commercial_type,
            'place_name': doc.place_name,
            'created_time': doc.created_time,
            'status': doc.status,
            'tasks': doc.tasks,
            'workforce' : doc.workforce
        });
    });
    return equipments;
};