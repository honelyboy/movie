var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var port = process.env.PORT || 8081
var app = express();


var dbUrl = 'mongodb://localhost/movie';

mongoose.connect(dbUrl);
app.use(cookieParser());
app.use(session({
	secret:'movie',
	store:new mongoStore({
		url:dbUrl,
		autoRemove: 'interval',
      	autoRemoveInterval: 10
	})
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment = require('moment')
if('development' === app.get('env')){
	app.set('showStackError',true);
	// app.use(express.logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug',true);
}

require('./config/routes')(app);
app.listen(port);

console.log('movie start');


