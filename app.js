/*var express = require('express');
var http = require('http');
var fs=require('fs')
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
// app.use(express.session());
app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
// development only
*/

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/

var http = require('http');
var fs=require('fs')
var path = require('path');

require('./app_api/models/db');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, '/app_server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
// app.use(express.session());
app.use(app.router);

app.set('view engine', 'jade')
app.use(express.compress());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
require('./routes')(app);
require('./app_api/routes')(app);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);