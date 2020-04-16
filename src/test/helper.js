/**
 * 
 * @param {maximum number to consider when randomizing} max 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const username = "test" + getRandomInt(10);

const testCred = {
    "username": username,
    "password": "123456"
}

const testUser = { 
    ...testCred,
    "lastName": "User",
    "firstName": "Test",
    "email": username + "@domain.com"
}

module.exports = {
    testCred,
    testUser
}