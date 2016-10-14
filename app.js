'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var nodemailer = require("nodemailer");
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var csrf = require('csurf');

var routes = require('./routes/index');
var contact = require('./routes/contact');
var signup = require('./routes/signup');
var login = require('./routes/login');
var fund_bet = require('./users-routes/fund_bet');
var dashboard = require('./users-routes/dashboard');
var withdraw_cash = require('./users-routes/withdraw_cash');
var buy_airtime = require('./users-routes/buy_airtime');
var edit_user = require('./users-routes/edit_user');
var admin = require('./admin-routes/index');
var admin_user = require('./admin-routes/user');
var credit_account = require('./admin-routes/credit_account');
var fund_request = require('./admin-routes/fund_request');
var recharge_request = require('./admin-routes/recharge_request');
var edit_recharge_request = require('./admin-routes/edit_recharge_request');
var edit_fund_request = require('./admin-routes/edit_fund_request');
var edit_withdraw_request = require('./admin-routes/edit_withdraw_request');
var withdraw_request = require('./admin-routes/withdraw_request');
var admin_unauthorised = require('./admin-routes/admin_unauthorised');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//handle file uploads
//app.use(multer({dest:'./uploads'}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam = '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
//handle express sessions
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));
app.use(csrf());
//Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(function(req,res,next){
res.locals.messages = require('express-validator')(req,res);
next();
});

app.use('/', routes);
app.use('/contact', contact);
app.use('/signup', signup);
app.use('/login', login);
app.use('/withdraw_cash',withdraw_cash);
app.use('/fund_bet', fund_bet);
app.use('/dashboard', dashboard);
app.use('/buy_airtime', buy_airtime);
app.use('/edit_user', edit_user);
app.use('/admin', admin);
app.use('/admin/user', admin_user);
app.use('/admin/fund_request', fund_request);
app.use('/admin/credit_account', credit_account);
app.use('/admin/withdraw_request', withdraw_request);
app.use('/admin/recharge_request', recharge_request);
app.use('/admin/edit_recharge_request', edit_recharge_request);
app.use('/admin/edit_fund_request', edit_fund_request);
app.use('/admin/edit_withdraw_request', edit_withdraw_request);
app.use('/admin_unauthorised', admin_unauthorised);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  //res.redirect('/');
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
