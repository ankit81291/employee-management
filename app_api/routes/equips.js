/**
 * Created by taolin-pc on 1/21/15.
 */

var ctrl = require('../controllers/equips');

module.exports = function(app){
    app.get('/api/equipments', ctrl.getEquipments);
};
