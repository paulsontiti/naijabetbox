'use strict';
var bcrypt = require('bcryptjs'),
crypto = require('crypto');
			/**
			 * generates random string of characters i.e salt
			 * @function
			 * @param {number} length - Length of the random string.
			 */
			var genRandomString = function(length){
			    return crypto.randomBytes(Math.ceil(length/2))
			            .toString('hex') /** convert to hexadecimal format */
			            .slice(0,length);   /** return required number of characters */
			};
			/**
			 * hash password with sha512.
			 * @function
			 * @param {string} password - List of required fields.
			 * @param {string} salt - Data to be validated.
			 */
			var sha512 = function(password, salt){
			    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
			    hash.update(password);
			    var value = hash.digest('hex');
			    return {
			        salt:salt,
			        passwordHash:value
			    };
			};
			module.exports = {
					  saltHashPassword : function(userpassword) {
				    var salt = genRandomString(16), /** Gives us salt of length 16 */
				    passwordData = sha512(userpassword, salt);
				    return{
				    	password:userpassword,
				    	hashPassword:passwordData.passwordHash,
				    	salt:passwordData.salt
				    }
				},
				confirmPassword : function(user,password){
					//get user password and salt from db
                   var userPassword = user.password,userSalt = user.salt,
                   //hash the salt and supplied password
                  hash = sha512(password,userSalt).passwordHash;
                   //check if hash matches userPassword
                   if(hash === userPassword){
                   	return true;
                   }else{
                   	return false;
                   }
				}
			}
