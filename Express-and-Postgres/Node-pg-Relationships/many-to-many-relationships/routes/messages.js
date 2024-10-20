const db = require('../db'); // import db 
const express = require('express'); // import express
const router = express.Router(); // create express router


router.get('/:id', async(req, res, next)=>{
    const { id } = req.params;
    try{
        const results = await db.query(
            `SELECT id, msg FROM messages WHERE id = $1`, [id]
        );
        return res.send(results.rows[0]);
    }catch(err){
        return next(err);
    }
});


module.exports = router; // export router