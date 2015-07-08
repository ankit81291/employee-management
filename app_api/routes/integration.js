/**
 * Created by taolin-pc on 12/5/14.
 */

var ctrl = require('../controllers/integration');

module.exports = function(app){
    // device integration
    app.post('/api/deviceevent', ctrl.deviceprocess);
    app.post('/api/equipmentevent', ctrl.equipmentprocess)
};