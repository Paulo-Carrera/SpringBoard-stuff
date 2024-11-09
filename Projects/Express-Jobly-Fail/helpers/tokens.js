const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function createToken(user) {
  console.log("CREATING TOKEN FOR USER: ", user);
  console.log("USING SECRET KEY: ", SECRET_KEY);
  let payload = {
    username : user.username,
    isAdmin : user.isAdmin || false,
  };
  return jwt.sign(payload, SECRET_KEY);  // Make sure SECRET_KEY is correctly used here
}

module.exports = {
  createToken
};