// Routes for users in our app
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res)=>{
    const results = await db.query(`SELECT * FROM users`);
    console.log(results.rows);
    
    return res.json(results.rows);
});



module.exports = router;