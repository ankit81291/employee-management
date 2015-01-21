/**
 * Created by taolin-pc on 1/21/15.
 */
var mongoose = require('mongoose');
var Equip = mongoose.model('Equip');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getEquips = function(req, res) {
    var results = Equip.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            equips = buildEquipsList(req, res, results);
            sendJsonResponse(res, 200, equips);
        }
    })
}

var buildEquipsList = function(req, res, results) {
    var equips = [];
    results.forEach(function(doc) {

        equips.push({
            equipment_name: doc.equipment_name,
            equipment_id: doc.equipment_id,
            equipment_type: doc.equipment_type,
            vendor: doc.vendor,
            commercial_type: doc.commercial_type,
            place_name: doc.place_name,
            created_time: doc.created_time,
            status: doc.status,
            tasks: doc.tasks,
            workforce : doc.workforce
        });
    });
    return equips;
};