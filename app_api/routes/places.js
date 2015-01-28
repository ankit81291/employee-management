/**
 * Created by taolin-pc on 1/20/15.
 */

var ctrl = require('../controllers/places');

module.exports = function(app){
    app.get('/api/places', ctrl.getPlaces);
    app.get('/api/places/names', ctrl.getNameList)
};
