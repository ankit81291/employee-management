module.exports = function(app){
//  require('./locations')(app);
  require('./alert')(app);
  require('./integration')(app);  
  require('./workers')(app);
  require('./tasks')(app);
};