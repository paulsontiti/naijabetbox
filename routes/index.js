'use strict';
var express = require('express'),
router = express.Router(),
User = require('../models/user'),
hashPassword = require('../models/hash-password'),
passport = require('passport'),
localStrategy = require('passport-local').Strategy;

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
