const express = require('express');
const db = require('../db');
const Cat = require('../models/cat');

const router = express.Router();

/** get all cats : [{id, name, age}, ...] */
router.get('/', async function(req, res, next){
    try{
        const cats = await Cat.getAll();    // no SQL required because 
        return res.json(cats);              // it's a static method from Cat class
    }catch(err){
        return next(err);
    }
});

router.get('/:id', async function(req, res, next){
    try{
        const cat = await Cat.getById(req.params.id);
        return res.json(cat);
    }catch(err){
        return next(err);
    }
})



module.exports = router ;