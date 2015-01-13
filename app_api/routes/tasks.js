var ctrl = require('../controllers/tasks');

module.exports = function(app){
  app.get('/api/tasks', ctrl.getTasks);
};