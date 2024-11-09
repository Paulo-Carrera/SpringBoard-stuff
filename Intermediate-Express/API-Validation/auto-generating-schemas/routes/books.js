const express = require('express');
const router = express.Router();
const ExpressError = require('../expressError');

router.post('/', function(req, res, next){
    const bookData = req.body.book;

    if(!bookData){
        let error = new ExpressError('Book data is required', 400);
        return next(error);
    }
    return res.json(bookData);
});

module.exports = router;