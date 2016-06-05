'use strict';
const router = require('express').Router();
const db = require('../db');



let _registerRoutes = function(routes, method) {
    for (let key in routes) {
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


let route = function(routes) {
    _registerRoutes(routes);
    return router;
}

let findOne = profileId => {
    return db.userModel.findOne({
        'profileId': profileId
    })
}

let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newChatUser = new db.userModel({
            profileId: profile.id,
            fullname: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });

        newChatUser.save(error => {
            if (error) {
                console.log('Create New User Error');
                reject(error);
            } else {
                resolve(newChatUser);
            }
        });
    });
}

let findById = id => {
    return new Promise ((resolve,reject) => {
        db.userModel.findById(id, (error,user) => {
            if (error) {
                reject(error);
            } else {
                resolve (user);
            }
        });
    });
}

let isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/')
    }
}


module.exports = {
    route,
    findOne,
    createNewUser,
    findById,
    isAuthenticated

}
