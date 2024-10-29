const express = require('express');
const router = new express.Router();
const db = require('../db');

router.get('/', async function(req, res, next){
    let dogs = await db.query(`SELECT * FROM dogs`);
    return res.json(dogs.rows);
});

module.exports = router;