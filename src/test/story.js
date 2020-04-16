require('rootpath')();

var supertest = require('supertest');
var server = supertest.agent("http://localhost:9000");
var assert = require("assert")

var { testCred, testUser, testStory } = require('src/test/helper')

///// UNIT TEST BEGIN /////

// unknown until authentication
var token = "" 
var eventId = ""

describe("STORIES:", () => {
    it("should be possible to authenticate the newly created user", (done) => {
        server.post("/users/authenticate")
            .send(testCred)
            .expect("Content-type", /json/)
            .expect(201)
            .end((err, res) => {
                try { 
                    token = res.body.token
                    assert(token.length, 149)
                    done()
                 } catch (error) {throw error}
            })
    })

    it("should be possible to create a new story", (done) => {
        server.post("/stories/create/")
        .set('Authorization', 'Bearer ' + token)
        .send(testStory)
        .expect("Content-type", /json/)
        .expect(200) // This is the HTTP response
        .end((err, res) => {
            try { 
                done()
             }
            catch (error) {throw error}
        })
    })

    it("should be possible to get all stories by user", (done) => {
        server.get("/stories/")
        .set('Authorization', 'Bearer ' + token)
        .expect("Content-type", /json/)
        .expect(200) // This is the HTTP response
        .end((err, res) => {
            try { 
                eventId = (res.body)[0]._id
                assert(res.body.length === 1)
                done() 
            }
            catch (error) {throw error}
        })
    })

    it("should be possible to get stories (belonging to user) by id", (done) => {
        server.get("/stories/" + eventId)
        .set('Authorization', 'Bearer ' + token)
        .expect("Content-type", /json/)
        .expect(200) // This is the HTTP response
        .end((err, res) => {
            try { 
                assert(res.body.title === testStory.title)
                done() 
            }
            catch (error) {throw error}
        })
    })

    it("should be possible to edit stories (belonging to the user)", (done) => {
        server.put("/stories/" + eventId)
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .send({ description: 'it happened! i have more details'})
        .end((err, res) => {
            try { done() }
            catch (error) {throw error}
        })
    })

    it("should be possible to delete stories", (done) => {
        server.delete("/stories/" + eventId)
        .set('Authorization', 'Bearer ' + token)
        .expect(200) // This is the HTTP response
        .end((err, res) => {
            try { 
                done()
            }
            catch (error) {throw error}
        })
    })

    it("querying stories again", (done) => {
        server.get("/stories/")
        .set('Authorization', 'Bearer ' + token)
        .expect("Content-type", /json/)
        .expect(200) // This is the HTTP response
        .end((err, res) => {
            try { 
                assert(res.body.length === 0)
                done() 
            }
            catch (error) {throw error}
        })
    })

})
