"use strict";

/** Routes for authentication. */
const jwt = require("jsonwebtoken");
const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");
const { SECRET_KEY } = require("../config");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post('/token', async function (req, res, next) {
  const { username, password } = req.body;

  if(!username || !password) {
    return res.status(401).json({ message: 'Missing username or password' });
  }
  // Validate username and password
  const user = await User.getByUsername(username);  // Your method to fetch user from DB
  if (!user) {
    return res.status(401).json({ message: 'Invalid username' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  // Generate and send token
  const token = createToken(user);  // Create token with user data
  return res.json({ token });
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  const user = await User.create({ username, password, email });
  const token = createToken(user);
  return res.status(201).json({ token });
});



module.exports = router;
