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
});

router.post('/', async function(req, res, next){
    console.log('Recieved POST request', req.body);
    try{
        const { name, age } = req.body;
        const cat = await Cat.create(name, age);
        return res.json(cat);
    }catch(err){
        console.log(err);
        return next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try{
        const { id } = req.params;
        await Cat.delete(id)
        return res.json({message : "Deleted"});
    }catch(err){
        return next(err);
    }
});

router.put('/:id', async function(req, res, next){
    try{
        const { id } = req.params ;
        const { name, age } = req.body ;
        const cat = await Cat.update(id, name, age);
        return res.json(cat);
    }catch(err){
        return next(err);
    }
});

router.patch('/:id', async function(req, res, next){
    try{
        const { id } = req.params ;
        const cat = await Cat.makeOlder(id);
        return res.json(cat);
    }catch(err){
        return next(err);
    }
});


module.exports = router ;