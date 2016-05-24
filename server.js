
var express = require('express');
var app  = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/',function (req,res) {
    res.render("login",{pageTitle: 'My Login Page'})
})

app.get('/dashboard',function (req,res) {
    res.send('<h1>This is the db page</h1>');
})



app.listen(app.get('port'),function () {
    console.log('Server is now running on Port: '+ app.get('port'))
});