/**
 * 
 * @param {maximum number to consider when randomizing} max 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const username = "test" + getRandomInt(1);

const testCred = {
    "username": username,
    "password": "123456"
};

const testUser = { 
    ...testCred,
    "lastName": "User",
    "firstName": "Test",
    "email": username + "@domain.com"
};

const testStory = {
    "title": "story " + username,
    "description": "it happened!",
    "tags": ["test_tag"],
    "geolocation": "123.123, -456.789"
};

module.exports = {
    testCred,
    testUser,
    testStory
};
