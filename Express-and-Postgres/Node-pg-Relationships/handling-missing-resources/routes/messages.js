const db = require('../db'); // import db 
const express = require('express'); // import express
const router = express.Router(); // create express router
const expressError = require('../expressError'); // import expressError
const ExpressError = require('../expressError');

router.get('/:id', async(req, res, next)=>{
    try{
        const results = await db.query(`
            SELECT m.id, m.msg, t.tag 
            FROM messages AS m 
            LEFT JOIN messages_tags AS mt 
            ON m.id = mt.message_id 
            LEFT JOIN tags AS t 
            ON mt.tag_code = t.code 
            WHERE m.id = $1`, [req.params.id]
        );
        if (results.rows.length === 0){     // handling missing resource
            throw new ExpressError(`Message not found with id ${req.params.id}`, 404);
        }
        const { id , msg } = results.rows[0];   // save id and msg in variables (destructuring) 
        const tags = results.rows.map(row => row.tag);  // save array of tags in variable by mapping results.rows
        return res.send({id, msg, tags});   // send id, msg, and array of tags
    }catch(err){
        return next(err);
    }
});

router.patch('/:id', async(req, res, next)=>{
    try{
        const results = await db.query(
            `UPDATE messages SET msg = $1 
            WHERE id = $2 RETURNING id, user_id, msg`,
            [req.body.msg, req.params.id]
        );
        if (results.rows.length === 0){     // handling missing resource
            throw new ExpressError(`Message not found with id ${req.params.id}`, 404);
        }
        return res.json(results.rows[0]);
    }catch(err){
        return next(err);
    }
});


module.exports = router; // export router
