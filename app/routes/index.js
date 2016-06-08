
const h = require('../helpers');
const passport = require('passport');

module.exports = function() {
    var routes = {
        'get': {
            '/': function(req, res, next) {
                res.render('login');
            },
            '/rooms':[h.isAuthenticated, function(req, res, next) {
                res.render('rooms',{ user:req.user});
            }],
            '/chat/:id': [h.isAuthenticated ,function(req, res, next) {
                res.render('chatroom', { user:req.user});
            }],
            '/auth/facebook':passport.authenticate('facebook'),
            '/auth/facebook/callback':passport.authenticate('facebook', {
                successRedirect: '/rooms',
                failureRedirect: '/login'
            }),
            '/logout':  (req,res,next) => {
                req.logout();
                res.redirect('/');
            }
            
        },
        'post': {

        },
        'NA': function (req,res,next){
        	res.status(404).sendFile(process.cwd() + '/views/404.htm')
        }
    }



return h.route(routes);
}
