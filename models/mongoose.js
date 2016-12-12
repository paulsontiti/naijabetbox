'use strict';
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/naijabetbox');
//mongoose.connect('mongodb://titile1987:titile1987@ds035826.mlab.com:35826/naijabetbox');
var db = mongoose.connection;
module.exports = mongoose;