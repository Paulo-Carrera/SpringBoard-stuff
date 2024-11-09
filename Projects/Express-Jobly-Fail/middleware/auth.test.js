"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureIsAdmin,
  ensureCorrectUserOrAdmin
} = require("./auth");

const { SECRET_KEY } = require("../config");
const testJwt = jwt.sign({ username: "test", isAdmin: false }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", isAdmin: false }, "wrong");

describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = jest.fn(); // Mock next function
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        isAdmin: false,
      },
    });
    expect(next).toHaveBeenCalled(); // Ensure next is called
  });

  test("works: no header", async () => {
    const req = {};  // No header
    const res = {
      status: jest.fn().mockReturnThis(),  // Mock status and return `this` for chaining
      json: jest.fn().mockReturnThis()    // Mock json
    };
    const next = jest.fn();

    await authenticateJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized: Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
  });

  test("works: invalid token", async () => {
    const req = { headers: { authorization: "Bearer invalidToken" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const next = jest.fn();

    await authenticateJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized: Invalid or expired token" });
    expect(next).not.toHaveBeenCalled();
  });
});


describe("ensureLoggedIn", function () {
  test("works", function () {
    expect.assertions(1);  // Expect 1 assertion to be called
    const req = {};  // Simulate a valid request
    const res = { locals: { user: { username: "test", isAdmin: false } } };  // Mock logged-in user
    const next = jest.fn();

    ensureLoggedIn(req, res, next);

    expect(next).toHaveBeenCalled(); // Ensure next is called
  });

  test("unauth if no login", function () {
    expect.assertions(2);  // Expect 2 assertions to be called
    const req = {};  // No user logged in
    const res = {
      locals: {},  // No user in res.locals
      status: jest.fn().mockReturnThis(),  // Mock status
      json: jest.fn().mockReturnThis()     // Mock json
    };
    const next = jest.fn();

    ensureLoggedIn(req, res, next);

    // Assert that res.status is called with 401 and res.json with the correct message
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });
});

describe("ensureIsAdmin", function () {
  test("works for admin", function () {
    expect.assertions(1);  // Expect 1 assertion to be called

    const req = {};  // Simulate a valid request
    const res = {
      locals: { user: { username: "test", isAdmin: true } },  // Mock admin user
      status: jest.fn().mockReturnThis(),  // Mock status method
      json: jest.fn().mockReturnThis()     // Mock json method
    };
    const next = jest.fn();

    // Simulate authenticateJWT middleware behavior
    const authenticateJWT = (req, res, next) => {
      req.user = { username: "test", isAdmin: true };  // Mock user data
      next();
    };

    // Call the middleware in sequence
    authenticateJWT(req, res, () => ensureIsAdmin(req, res, next));

    // Check that next() was called, meaning the middleware passed
    expect(next).toHaveBeenCalled();
  });

  test("unauth if not admin", function () {
    expect.assertions(2);  // Expect 2 assertions to be called

    const req = {};  // Simulate a valid request
    const res = {
      locals: { user: { username: "test", isAdmin: false } },  // Mock non-admin user
      status: jest.fn().mockReturnThis(),  // Mock status method
      json: jest.fn().mockReturnThis()     // Mock json method
    };
    const next = jest.fn();

    // Simulate authenticateJWT middleware behavior
    const authenticateJWT = (req, res, next) => {
      req.user = { username: "test", isAdmin: false };  // Mock user data
      next();
    };

    // Call the middleware in sequence
    authenticateJWT(req, res, () => ensureIsAdmin(req, res, next));

    // Assert that res.status was called with 403 (Forbidden)
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
  });
});

describe("ensureCorrectUserOrAdmin", function () {
  test("works for admin", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: { user: { username: "admin", isAdmin: true } } };
    const next = jest.fn();
    ensureCorrectUserOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled(); // Ensure next is called
  });

  test("works for correct user", function () {
    expect.assertions(1);
    const req = { params: { username: "test" } };
    const res = { locals: { user: { username: "test", isAdmin: false } } };
    const next = jest.fn();
    ensureCorrectUserOrAdmin(req, res, next);
    expect(next).toHaveBeenCalled(); // Ensure next is called
  });

  test("unauth if not admin and not correct user", function () {
    const req = { params: { username: "test" } };
    const res = {
      locals: { user: { username: "u1", isAdmin: false } },
      status: jest.fn().mockReturnThis(),  // Mock status
      json: jest.fn()                      // Mock json
    };
    const next = jest.fn();

    ensureCorrectUserOrAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403); // Ensure 403 status is called
    expect(res.json).toHaveBeenCalledWith({ message: "Forbidden" });
    expect(next).not.toHaveBeenCalled(); // Ensure next is not called
  });
});


