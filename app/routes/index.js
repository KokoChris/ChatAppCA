var router = require('express').Router();

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
            }
        },
        'post': {

        }
    }



    var registerRoutes = function(routes, method) {
        for (var key in routes) {
            if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
                registerRoutes(routes[key], key);
            } else {
                if (method === 'get') {
                    router.get(key, routes[key]);
                } else if (method === 'post') {
                    router.post(key, routes[key]);
                }
            }
        }
    }

    registerRoutes(routes);
    return router;
}
