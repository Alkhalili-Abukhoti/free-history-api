require('rootpath')()
require('dotenv').config()

const supertest = require('supertest')
const server = supertest.agent("http://localhost:9000")
var assert = require("assert")

var { testCred, testUser } = require('src/test/helper')

///// UNIT TEST BEGIN /////

// unknown until authentication
var token = "" 
var id = ""

describe("USERS:", () => {

    it("should be possible to authenticate the newly created user", (done) => {
        server.post("/users/authenticate")
            .send(testCred)
            .expect("Content-type", /json/)
            .expect(201)
            .end((err, res) => {
                try { 
                    token = res.body.token;
                    assert(token.length, 149)
                    done()
                 } catch (error) {throw error}
            })
    })

    var id = "" // unknown until current user becomes known
    it("should be possible to get all users", (done) => {
        server.get("/users/")
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                try {
                    //console.log(res)    
                    assert(res.body.length, 1)
                    done()
                } catch (error) {throw error}
            })
    })

    it("should be possible to get current user info", (done) => {
        server.get("/users/current")
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                id = res.body._id;
                done()
            })
    })

    it("should be possible to modify existing users", (done) => {
        server.put("/users/" + id)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .send({ email: "potato@domain.com"})
        .end((err, res) => {
            try { done() }
            catch (error) {throw error}
        })
    })

    it("should be possible to get user by id", (done) => {
        server.get("/users/" + id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                try {
                    assert(res.body.email, "potato@domain.com")
                    done()
                } catch (error) { throw error }
            })
    })

})
