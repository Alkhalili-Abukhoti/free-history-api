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

var token = ""; // unknown until authentication
describe("User creation and authentication", () => {
    it(`should be possible to register a new user: ${username}`, (done) => {
        server.post("/users/register")
        .send(testUser)
        .expect("Content-type", /json/)
        .expect(200) // This is the HTTP response
        .end(function(err, res){
            done();
        });
    });

    it("should be possible to authenticate the newly created user", (done) => {
        server.post("/users/authenticate")
        .send(testCred)
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
            token = res.body.token;
            assert(token.length, 149);
            done();
        });
    });
});

var id = ""; // unknown until current user becomes known
describe("Getting users", () => {
    it("should be possible to get all users", (done) => {
        server.get("/users/")
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res) => {
            assert(res.body.length, 1);
            done();
        });
    });

    it("should be possible to get current user info", (done) => {
        server.get("/users/current")
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res) => {
            id = res.body._id;
            done();
        });
    });

    it("should be possible to get user by id", (done) => {
        server.get("/users/" + id)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res) => {
            done();
        });
    });
});

describe("Modifying and deleting users", () => {
    it("should be possible to modify user info", (done) => {
        server.put("/users/" + id)
        .set('Authorization', 'Bearer ' + token)
        .send({ "email": "changed@domain.com"})
        .expect(200)
        .end((err, res) => {
            done();
        });
    });

    it("should be possible to delete created users", (done) => {
        server.delete("/users/" + id)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res) => {
            done();
        });
    });
});

