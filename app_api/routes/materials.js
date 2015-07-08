/**
 * Created by taolin-pc on 1/21/15.
 */

var ctrl = require('../controllers/materials');

module.exports = function(app){
    app.get('/api/materials', ctrl.getMaterials);
};