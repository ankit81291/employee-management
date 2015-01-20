var ctrl = require('../controllers/workers');

module.exports = function(app){
  app.get('/api/workers', ctrl.getWorkers);  
  app.post('/api/tasks/create', ctrl.createWorker);
};