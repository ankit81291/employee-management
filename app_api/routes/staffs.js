/**
 * Created by taolin-pc on 1/20/15.
 */

var ctrl = require('../controllers/staffs');

module.exports = function(app){
    app.get('/api/staffs', ctrl.getStaffs);
};