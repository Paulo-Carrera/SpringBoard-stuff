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



module.exports = router;