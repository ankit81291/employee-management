var ctrl = require('../controllers/alert');

module.exports = function(app){
  app.get('/api/alerts', ctrl.getAlerts);
  app.get('/api/alert/:alerttype', ctrl.getAlert);  
  app.put('/api/alert/:alertid',ctrl.updateAlert);
 
};