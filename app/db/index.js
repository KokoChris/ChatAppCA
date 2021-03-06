'use strict';
var config = require('../config');


var Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.connection.on('error', function(error) {
    consolel.log("Oups" + error);
})
var chatUser = new Mongoose.Schema({
    profileId: String,
    fullname: String,
    profilePic: String
});

var userModel = Mongoose.model('chatUser', chatUser);


module.exports = {
    Mongoose, 
    userModel 
};