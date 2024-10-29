const express = require('express');
const router = new express.Router();
// const db = require('../db');
const Dog = require('../models/dog');

router.get('/', async function(req, res, next){
    try{
        let dogs = await Dog.getAll();
        // dogs.forEach(dog => dog.speak());
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

router.post('/', async function(req, res, next){
    try{
        const { name, age } = req.body ;
        let dog = await Dog.create(name, age);
        return res.json(dog);
    }catch(err){
        return next(err);
    }
});

router.delete('/:id', async function(req, res, next){
    try{
        const { id } = req.params ;
        let dog = await Dog.getById(id);
        await dog.remove();
        return res.json({ msg : `Fuck that nigga ${dog.name}`});
    }catch(err){
        return next(err);
    }
});

router.patch('/:id/age', async function(req, res, next){
    try{
        const { id } = req.params;
        let dog = await Dog.getById(id);
        dog.age += 1;
        await dog.save();
        return res.json(dog);
    }catch(err){
        return next(err);
    }
});

router.patch('/:id/rename', async function(req, res, next){
    try{
        const { id } = req.params;
        const { name } = req.body;
        let dog = await Dog.getById(id);
        dog.name = name ;
        await dog.save();
        return res.json(dog);
    }catch(err){
        return next(err);
    }
});

module.exports = router;