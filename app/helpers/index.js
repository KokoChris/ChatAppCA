var router = require('express').Router();


var _registerRoutes = function(routes, method) {
    for (var key in routes) {
        if (typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)) {
            _registerRoutes(routes[key], key);
        } else {
            if (method === 'get') {
                router.get(key, routes[key]);
            } else if (method === 'post') {
                router.post(key, routes[key]);
            } else {
            	router.use(routes[key])
            }
        }
    }
}


var route = function (routes) {
    _registerRoutes(routes);
    return router;
}

module.exports = {
    route: route
}
