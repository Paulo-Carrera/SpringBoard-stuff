const request = require("supertest");
const app = require("../app");
const { commonAfterAll } = require("./_testCommon");
const db = require("../db");

let u1Token;
let adminToken;

beforeAll(async function () {
  // Request to get tokens for the users
  const u1Response = await request(app)
    .post("/auth/token")
    .send({ username: "u1", password: "password1" });
  
  // Ensure u1 token was received
  console.log(u1Response.body);
  if (!u1Response.body.token) {
    throw new Error("u1 token not received");
  }
  u1Token = u1Response.body.token;  // Use the token received from the response

  const adminResponse = await request(app)
    .post("/auth/token")
    .send({ username: "adminUser", password: "adminPassword" });  // Correct password for admin user
  
  // Ensure admin token was received
  if (!adminResponse.body.token) {
    throw new Error("admin token not received");
  }
  adminToken = adminResponse.body.token;  // Use the token received from the response
});

test("works for logged-in user viewing their own profile", async function () {
  const resp = await request(app)
    .get("/users/u1")
    .set("authorization", `Bearer ${u1Token}`);  // Using u1's token

  expect(resp.statusCode).toEqual(200);
  expect(resp.body).toEqual({
    user: {
      username: "u1",
      firstName: "U1F",
      lastName: "U1L",
      email: "u1@email.com",  // Correct the expected email
      isAdmin: false
    }
  });
});

test("works for admin user viewing another user's profile", async function () {
  const resp = await request(app)
    .get("/users/u2")
    .set("authorization", `Bearer ${adminToken}`);  // Using admin's token

  expect(resp.statusCode).toEqual(200);
  expect(resp.body).toEqual({
    user: {
      username: "u2",
      firstName: "U2F",
      lastName: "U2L",
      email: "u2@email.com",  // Correct the expected email
      isAdmin: false
    }
  });
});

test("unauth for non-admin user viewing another user's profile", async function () {
  const resp = await request(app)
    .get("/users/u2")
    .set("authorization", `Bearer ${u1Token}`);  // Using u1's token

  expect(resp.statusCode).toEqual(403);  // Forbidden
});

test("unauth for anon", async function () {
  const resp = await request(app)
    .get("/users/u1");

  expect(resp.statusCode).toEqual(401);  // Unauthorized
});

test("not found if user not found", async function () {
  const resp = await request(app)
    .get("/users/nope")  // Non-existent user
    .set("authorization", `Bearer ${u1Token}`);

  expect(resp.statusCode).toEqual(404);  // Not Found
});

commonAfterAll(async function(){
  await db.end();
});


