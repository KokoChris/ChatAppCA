var config = require('../config');


var Mongoose = require('mongoose').connect(config.dbURI);

Mongoose.connection.on('error', function(error){
	consolel.log("Oups" + error);
})

module.exports ={
	Mongoose:Mongoose
};