require('rootpath')();
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('src/helpers/jwt');
const errorHandler = require('src/helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// api routes
app.use('/users', require('src/controllers/users'));
app.use('/stories', require('src/controllers/stories'));

// global error handler
app.use(errorHandler);

// start server
app.listen(process.env.PORT, function() {
    console.log(`Free History API running on port ${process.env.PORT}....`)
});
