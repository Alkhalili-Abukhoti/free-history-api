var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/free-history', {
    useNewUrlParser: true, useUnifiedTopology: true
});

var Event = require('./model/Event');
var User = require('./model/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res, next) => {
    res.json("You're on slash!");
});

app.get('/users', (req, res) => {
    return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
});
 
app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});
  
app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(3000, function() {
    console.log("Free History API running on port 3000....")
})