"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureLoggedIn, authenticateJWT, ensureIsAdmin } = require("../middleware/auth");
const Company = require("../models/company");

const companyNewSchema = require("../schemas/companyNew.json");
const companyUpdateSchema = require("../schemas/companyUpdate.json");

const router = new express.Router();


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login
 */

router.post("/", ensureIsAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, companyNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const company = await Company.create(req.body);
    if(!company) {
      throw new Error("Company creation failed");
    }
    return res.status(201).json({ company });
  }catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  try {
    const companies = await Company.findAll();
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});

/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
  try {
    const company = await Company.get(req.params.handle);
    return res.json({ company });
  } catch (err) {
    console.log("ERROR IN GET /companies/:handle: ", err);
    return next(err);
  }
});

// GET /filter
// { minEmployees, maxEmployees, nameLike }
// { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
// Authorization required: none
router.get("/filter", async function (req, res, next) {
  try {
    const companies = await Company.filter(req.query);
    return res.json({ companies });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: login
 */

router.patch("/:handle", ensureIsAdmin, async function (req, res, next) {
  try {
    console.log(`UPDATING COMPANY WITH HANDLE: ${req.params.handle}`);
    console.log("REQUEST BODY: ", req.body);
    const validator = jsonschema.validate(req.body, companyUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      console.log("SCHEMA VALIDATION ERRORS: ", errs);
      throw new BadRequestError(errs);
    }

    const company = await Company.update(req.params.handle, req.body);
    console.log("UPDATED COMPANY: ", company);
    return res.json({ company });
  } catch (err) {
    console.log("ERROR IN PATCH /companies/:handle: ", err);
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: login
 */

router.delete("/:handle", ensureLoggedIn, ensureIsAdmin, async function (req, res, next) {
  try {
    console.log(`DELETING COMPANY WITH HANDLE: ${req.params.handle}`);
    await Company.remove(req.params.handle);
    return res.json({ deleted: req.params.handle });
  } catch (err) {
    console.log("ERROR IN DELETE /companies/:handle: ", err);
    return next(err);
  }
});


module.exports = router;
