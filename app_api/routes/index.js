module.exports = function(app){
//  require('./locations')(app);
  require('./alert')(app);
  require('./integration')(app);  
  require('./tasks')(app);
  require('./devices')(app);
  require('./workers')(app);
  require('./places')(app);
  require('./staffs')(app);
  require('./equips')(app);
  require('./materials')(app);
  require('./projects')(app);
  require('./timesheet')(app);
};