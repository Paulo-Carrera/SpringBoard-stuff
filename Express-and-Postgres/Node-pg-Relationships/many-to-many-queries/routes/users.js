const db = require('../db'); // import db 
const express = require('express'); // import express
const router = express.Router(); // create express router


router.get('/', async(req,res,next)=>{
    try{
        const results = await db.query(
            `SELECT * FROM users`
        );
        return res.json(results.rows);
    }catch(err){
        return next(err);
    }
});

// one to many relationship query to get user and list of messages
router.get('/:id', async(req,res,next)=>{
    const { id } = req.params;
    try{
        const userResults = await db.query(                  // first query to get user
            `SELECT name, type FROM users WHERE id = $1`,
            [id]
        );
        const messageResults = await db.query(              // second query to get list of messages
            `SELECT id, msg FROM messages WHERE user_id = $1`, 
            [id]
        );
        const user = userResults.rows[0];                   // save user in variable
        user.messages = messageResults.rows;                // save messages in the user variable 
        return res.send(user);
    }catch(err){
        return next(err);
    }
});


module.exports = router; // export router