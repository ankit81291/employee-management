var ctrl = require('../controllers/alerts');

module.exports = function(app){
  app.get('/api/alerts', ctrl.getAlerts);
  app.get('/api/alert/:alerttype', ctrl.getAlert);
 
};