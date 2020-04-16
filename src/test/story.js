require('rootpath')();

var supertest = require('supertest');
var server = supertest.agent("http://localhost:9000");
var assert = require("assert");

var mongoose = require('mongoose');
