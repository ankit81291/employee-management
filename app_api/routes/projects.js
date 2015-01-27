var ctrl = require('../controllers/projects');

module.exports = function(app){
  app.get('/api/projects', ctrl.getProjects);
};