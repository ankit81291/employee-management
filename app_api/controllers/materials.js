/**
 * Created by taolin-pc on 1/21/15.
 */

var mongoose = require('mongoose');
var Material = mongoose.model('Material');

var sendJsonResponse = function(res, status, content) {
    console.log(content);
    res.status(status);
    res.json(content);
};

module.exports.getMaterials = function(req, res) {
    var results = Material.find().exec(function(err, results){
        if(err){
            throw err;
        } else {
            material = buildMaterialList(req, res, results);
            sendJsonResponse(res, 200, material);
        }
    })
}

var buildMaterialList = function(req, res, results) {
    var materials = [];
    results.forEach(function(doc) {

        materials.push({
            'name': doc.name,
            'sku': doc.sku,
            'order_number': doc.order_number,
            'quantity': doc.quantity,
            'consumed': doc.consumed,
            'created_time': doc.created_time,
            'place_name': doc.place_name
        });
    });
    return materials;
};