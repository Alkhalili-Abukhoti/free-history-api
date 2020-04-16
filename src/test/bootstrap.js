require('rootpath')();

const supertest = require('supertest');
const server = supertest.agent("http://localhost:9000");
const assert = require("assert");
const {describe, it, before, after} = require("mocha");

const { testCred, testUser } = require('src/test/helper');

///// UNIT TEST BEGIN /////

// unknown until authentication
let token;
let id;

describe("BOOTSTRAP:", () => {
    before((done) => {
        server.post("/users/register")
            .send(testUser)
            .expect("Content-type", /json/)
            .expect(200, done) // This is the HTTP response
    });

    it("should be possible to authenticate the newly created user", (done) => {
        server.post("/users/authenticate")
            .send(testCred)
            .expect("Content-type", /json/)
            .expect(201)
            .end((err, res) => {
                try {
                    token = res.body.token;
                    id = res.body._id;
                    assert(token.length === 149);
                    done()
                } catch (error) {throw error}
            })
    });

    require("src/test/user");
    require("src/test/story");

    after((done) => {
        server.delete("/users/" + id)
            .set("Authorization", "Bearer " + token)
            .expect(200, done);
    });

});
