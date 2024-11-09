"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];  // Extract token from "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token format is incorrect" });
    }

    // Verify the token
    const payload = jwt.verify(token, SECRET_KEY);
    res.locals.user = payload;  // Attach the payload to res.locals.user
    
    return next();  // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token verification failed:", err);  // Add logging for debugging
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
}





/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) {
      return res.status(401).json({ message : "Unauthorized" });
    }
    return next();
  }catch (err) {
    return res.status(401).json({ message : "Unauthorized" });
  }
}

// Middleware to ensure that the user is an admin
// if not, raise unauthorized error
function ensureIsAdmin(req, res, next) {
  console.log("USER: ", req.user);
  console.log("ADMIN CHECK: ", res.locals.user.isAdmin);
  if (req.user && res.locals.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}

// Middleware to ensure that the user is logged in or is an admin
// if not, raise unauthorized error
function ensureLoggedInOrAdmin(req, res, next) {
  if (!res.locals.user) {
    return res.status(401).json({ message: "Unauthorized" });  // Unauthorized if no user is logged in
  }

  // Check if the logged-in user is either the requested user or an admin
  if (res.locals.user.username !== req.params.username && !res.locals.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });  // Forbidden if user is not the requested user or admin
  }

  next();  // Proceed to the next middleware or route handler if checks pass
}



// Middleware to ensure correct user or admin access 
function ensureCorrectUserOrAdmin(req, res, next) {
  try {
    const user = res.locals.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user && (user.username === req.params.username || user.isAdmin)) {
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden" }); // Corrected here
    }
  } catch (err) {
    return next(err);
  }
}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureIsAdmin,
  ensureLoggedInOrAdmin,
  ensureCorrectUserOrAdmin
};

