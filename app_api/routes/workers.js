var ctrl = require('../controllers/workers');

module.exports = function(app){
  app.get('/api/workers', ctrl.getWorkers);
  app.post('/api/workers/create', ctrl.createWorker);
  app.get('/api/Workers/names', ctrl.getNameList);
};