"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  adminToken, 
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe("POST /users", function () {
  // ... existing POST /users tests
});

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("works for logged-in user viewing their own profile", async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for GET /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false
      }
    });
  });
  
  test("works for admin user viewing another user's profile", async function () {
    const resp = await request(app)
      .get(`/users/u2`)
      .set("authorization", `Bearer ${adminToken}`);
    
    console.log("Response for GET /users/u2 (admin): ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      user: {
        username: "u2",
        firstName: "U2F",
        lastName: "U2L",
        email: "user2@user.com",
        isAdmin: false
      }
    });
  });
  
  test("unauth for non-admin user viewing another user's profile", async function () {
    const resp = await request(app)
      .get(`/users/u2`)
      .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for non-admin GET /users/u2: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(403);  // Forbidden
  });
  
  test("unauth for anon", async function () {
    const resp = await request(app)
      .get(`/users/u1`);
    
    console.log("Response for anon GET /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(401);  // Unauthorized
  });
  
  test("not found if user not found", async function () {
    const resp = await request(app)
      .get(`/users/nope`)
      .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for non-existent user GET /users/nope: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(404);  // Not Found if the user doesn't exist
  });
});  

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
  test("works for users modifying their own profile", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        })
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for PATCH /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

  test("works for admin user modifying another user's profile", async function () {
    const resp = await request(app)
        .patch(`/users/u2`)
        .send({
          firstName: "New First",
        })
        .set("authorization", `Bearer ${adminToken}`);
    
    console.log("Response for admin PATCH /users/u2: ", resp.statusCode, resp.body); // Add this log

    expect(resp.body).toEqual({
      user: {
        username: "u2",
        firstName: "New First",
        lastName: "U2L",
        email: "user2@user.com",
        isAdmin: false,
      },
    });
  });

  test("unauth for non-admin user modifying another user's profile", async function () {
    const resp = await request(app)
        .patch(`/users/u2`)
        .send({
          firstName: "New First",
        })
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for non-admin PATCH /users/u2: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(403); // Forbidden
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: "New",
        });
    
    console.log("Response for anon PATCH /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(401); // Unauthorized
  });

  test("not found if no such user", async function () {
    const resp = await request(app)
        .patch(`/users/nope`)
        .send({
          firstName: "Nope",
        })
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for PATCH /users/nope: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(404);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
        .patch(`/users/u1`)
        .send({
          firstName: 42, // Invalid data type
        })
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for invalid PATCH /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  test("works for admin user deleting another user", async function () {
    const resp = await request(app)
        .delete(`/users/u2`)
        .set("authorization", `Bearer ${adminToken}`);
    
    console.log("Response for DELETE /users/u2 (admin): ", resp.statusCode, resp.body); // Add this log

    expect(resp.body).toEqual({ deleted: "u2" });
  });

  test("works for users deleting their own profile", async function () {
    const resp = await request(app)
        .delete(`/users/u1`)
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for DELETE /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("unauth for non-admin user deleting another user", async function () {
    const resp = await request(app)
        .delete(`/users/u2`)
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for non-admin DELETE /users/u2: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(403); // Forbidden
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/users/u1`);
    
    console.log("Response for anon DELETE /users/u1: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(401); // Unauthorized
  });

  test("not found if user missing", async function () {
    const resp = await request(app)
        .delete(`/users/nope`)
        .set("authorization", `Bearer ${u1Token}`);
    
    console.log("Response for DELETE /users/nope: ", resp.statusCode, resp.body); // Add this log

    expect(resp.statusCode).toEqual(404);
  });
}); 
