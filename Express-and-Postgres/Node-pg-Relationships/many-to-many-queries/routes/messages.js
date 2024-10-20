const db = require('../db'); // import db 
const express = require('express'); // import express
const router = express.Router(); // create express router


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
        const { id , msg } = results.rows[0];   // save id and msg in variables (destructuring) 
        const tags = results.rows.map(row => row.tag);  // save array of tags in variable by mapping results.rows
        return res.send({id, msg, tags});   // send id, msg, and array of tags
    }catch(err){
        return next(err);
    }
});


module.exports = router; // export router