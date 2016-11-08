'use strict';
var mongoose = require('../models/mongoose');
//user schema
var userSchema = mongoose.Schema({
	firstname:{
		type:String,
		required:true
	},
	lastname:{
		type:String,
		required:true
	},
	username:{
		type:String,
		index:true,
		required:true,
		unique:true
	},
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	phone_number:{
		type:String,
		required:true
	},
	alternate_phone_number:{
		type:String
	},
	salt:{
		type:String,
		required:true
	},
	isAdmin:{
		type:String,
		default:'No'
	},
	balance:{
		type:Number,
		default:0
	},
	bonus:{
		type:Number,
		default:0
	},
	total_balance:{
		type:Number,
		default:0
	},
	withdrawable_balance:{
		type:Number,
		default:0
	},
	joinedDate:{
		type:String,
		default:new Date().toLocaleString()
	}
});
var User = module.exports = mongoose.model('User',userSchema);
module.exports.createUser =function(newUser,callback){
	newUser.save(callback);
};
module.exports.getAUser =function(query,callback){
	User.findOne(query,callback);
};
module.exports.getAllUsers =function(callback){
	User.find(callback);
};
module.exports.updateAUser =function(query,updateParams,callback){
	User.findOneAndUpdate(query,{$set:updateParams},callback);
};
module.exports.getUserById =function(id,callback){
	User.findById(id,callback);
};
module.exports.creditAccount =function(user_name,amount,callback){
			var	bonus = amount * 0.05,
			total = Number(amount) + Number(bonus),
			withdrawable = amount - (amount * 0.025);
		User.findOneAndUpdate({username:user_name},
			{$inc:{balance:amount,bonus:bonus,total_balance:total,withdrawable_balance:withdrawable}}
			,callback);
	
	
};