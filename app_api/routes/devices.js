/**
 * Created by taolin-pc on 1/20/15.
 */

var ctrl = require('../controllers/devices');

module.exports = function(app){
    app.get('/api/devices', ctrl.getDevices);
};
