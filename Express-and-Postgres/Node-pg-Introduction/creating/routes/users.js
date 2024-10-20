// Routes for users in our app
const express = require('express');
const router = express.Router();
const db = require('../db');
const { nextTick } = require('process');


router.get('/', async (req, res)=>{
    try{
        const results = await db.query(`SELECT * FROM users`);
        return res.json(results.rows);
    }catch(err){
        return next(err);
    }
});

router.get('/search', async(req, res, next)=>{
    try{
        const type = req.query.type;                        // "sanatized" input query below.
        const results = await db.query(`SELECT * FROM users WHERE type = $1`, [type]); 
        return res.json(results.rows);
    }catch(err){
        return next(err);
    }
});

router.post('/', async(req,res,next)=>{
    try{
        const {name, type} = req.body;
        const results = await db.query(             // Returning clause for INSERT.
            `INSERT INTO users (name, type) VALUES ($1, $2) RETURNING *`, [name, type]
        );
        
        return res.status(201).json(results.rows[0]); // 201 = created. only send back newest user. [0]
    }catch(err){
        return next(err);
    }
});


module.exports = router;



