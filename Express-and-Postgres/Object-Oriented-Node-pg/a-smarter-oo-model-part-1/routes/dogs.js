const express = require('express');
const router = new express.Router();
// const db = require('../db');
const Dog = require('../models/dog');

router.get('/', async function(req, res, next){
    try{
        let dogs = await Dog.getAll();
        dogs.forEach(dog => dog.speak());
        return res.json(dogs);
    }catch(err){
        return next(err);
    }
});

router.get('/:id', async function(req, res, next){
    try{
        const { id } = req.params;
        let dog = await Dog.getById(id);
        return res.json(dog);
    }catch(err){
        return next(err);
    }
});

module.exports = router;



