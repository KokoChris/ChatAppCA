var express = require('express');
var app = express();
var chatApp = require('./app');


app.set('port', process.env.PORT || 3000);
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use('/',chatApp.session)

app.use('/', chatApp.router);



app.listen(app.get('port'), function() {
    console.log('Server is now running on Port: ' + app.get('port'))
});
