var ctrl = require('../controllers/tasks');

module.exports = function(app){
  app.get('/api/tasks', ctrl.getTasks);
  app.post('/api/tasks/create', ctrl.createTask);
  app.put('/api/tasks/:taskname',ctrl.updateTask);
  app.get('/api/tasks/names', ctrl.getNameList);
  app.get('/api/performancedata', ctrl.getPerformanceData);
};