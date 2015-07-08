var ctrl = require('../controllers/timesheet');

module.exports = function (app) {
  app.get('/api/calendarEvents', ctrl.getCalendarEvents);
};