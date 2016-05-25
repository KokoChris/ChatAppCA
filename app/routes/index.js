
var h = require('../helpers');

module.exports = function() {
    var routes = {
        'get': {
            '/': function(req, res, next) {
                res.render('login');
            },
            '/rooms': function(req, res, next) {
                res.render('rooms');
            },
            '/chat': function(req, res, next) {
                res.render('chatroom');
            },
            '/getSession': function(req,res,next){
            	res.send('My favourite color' + req.session.favColor)
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
