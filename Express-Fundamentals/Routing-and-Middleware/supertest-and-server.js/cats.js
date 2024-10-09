const express = require('express');
const router = new express.Router();
const ExpressError = require('./expressError');
const cats = require('./fakeDB');

// ROUTES FOR /cats

router.get('/', function(req, res){
    res.json({ cats })
});

router.post('/', function(req, res){
    const newCat = { name : req.body.name };
    cats.push(newCat)
    res.status(201).json({ cat : newCat })
});

router.get('/:name', function(req, res){
    const foundCat = cats.find(cat => cat.name === req.params.name);
    if(foundCat === undefined){
        throw new ExpressError('Cat Not Found', 404);
    }
    res.json({ cat : newCat })
})

router.patch('/:name', function(req, res){
    const foundCat = cats.find(cat => cat.name === req.params.name);
    if(foundCat === undefined){
        throw new ExpressError('Cat Not Found', 404);
    }
    foundCat.name = req.body.name
    res.json({ cat : foundCat });
});

router.delete('/:name', function(req, res){
    const foundCat = cats.find(cat => cat.name === req.params.name);
    if(foundCat === undefined){
        throw new ExpressError('Cat Not Found', 404);
    }
    cats.splice(foundCat, 1);
    res.json({ message : 'Deleted' });
})


module.exports = router     // export the router to app.js