const express = require('express');
const router = express.Router();
const ExpressError = require('../expressError');
const jsonschema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json");

router.post('/', function(req, res, next) {
    // check that the JSON sent is valid using jsonschema
    const result = jsonschema.validate(req.body, bookSchema);

    // if not valid, return list of errors from jsonschema result object
    if (!result.valid) {
        // map the errors to a list of strings and pass it to the ExpressError
        const listOfErrors = result.errors.map(e => e.stack);
        const error = new ExpressError(listOfErrors, 400);
        // return the error
        return next(error);
    }
    // otherwise, return valid json
    return res.json("VALID!");
});


module.exports = router;
