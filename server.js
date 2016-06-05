'use strict';

const express = require('express');
const app = express();
const chatApp = require('./app');
const passport = require('passport');


app.set('port', process.env.PORT || 3000);
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use('/', chatApp.session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', chatApp.router);



chatApp.ioServer(app).listen(app.get('port'), function() {
    console.log('Server is now running on Port: ' + app.get('port'))
});
