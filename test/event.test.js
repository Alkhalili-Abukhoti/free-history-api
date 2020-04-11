require('dotenv').config();

var supertest = require('supertest');
var server = supertest.agent("http://localhost:9000");
var assert = require("assert");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var username = "test" + getRandomInt(10);

var testCred = {
    "username": username,
    "password": "123456"
}
var testUser = {
    ...testCred,
    "lastName": "User",
    "firstName": "Test",
    "email": username + "@domain.com"
}

///// UNIT TEST BEGIN /////
