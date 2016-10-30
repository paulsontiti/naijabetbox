'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var hashPassword = require('../models/hash-password');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  User.getAUser({username:req.session.username},function(err,user){
      if(err){
        console.log(err);
      }else{
      res.locals.user = user;
        res.render('index',{title:'Home'});
    }
    });
});

module.exports = router;
