var passport = require('passport');
var config = require('../config');
var h = require('../helpers');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
    	h.findById(id)
    		.then(user => done(null, user))
    		.catch(error => console.log('Error when deserializingUser'));
    });




    var authProcessor = function(accessToken, refreshToken, profile, done) {
        h.findOne(profile.id)
            .then(function(result) {
                if (result) {
                    done(null, result);
                } else {
                    h.createNewUser(profile)
                        .then(newChatUser => done(null, newChatUser))
                        .catch(error => console.log(error));
                }
            })
    }

    passport.use(new FacebookStrategy(config.fb, authProcessor));

}
