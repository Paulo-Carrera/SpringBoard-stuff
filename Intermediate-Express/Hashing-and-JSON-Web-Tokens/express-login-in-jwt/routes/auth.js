const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config')

// token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBhdWxvY2FycmVyYWEiLCJpYXQiOjE3MzAxNzQ5NTB9.Skg1w9JnNon3MQ0vrMylHOXm6dreMNgokfjCny9gHes

router.get('/', (req, res, next)=>{
    res.send("APP IS WORKING!");
});

router.post('/register', async (req, res, next)=>{
    try{
        const { username , password } = req.body ;
        if(!username || !password){
            throw new ExpressError('Missing username or password', 400);
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password , BCRYPT_WORK_FACTOR);
        // save to db 
        const result = await db.query(
            `INSERT INTO users (username, password)
            VALUES ($1, $2) 
            RETURNING username`,
            [username, hashedPassword]
        )
        return res.json(result.rows[0]);
    }catch(e){
        if(e.code === '23505'){
            return next(new ExpressError('Username taken. Please choose another username', 400));
        }
        return next(e);
    }
});

router.post('/login', async (req, res, next)=>{
    try{
        const { username, password } = req.body;
        if(!username || !password){
            throw new ExpressError('Missing username or password', 400);
        }
        const result = await db.query(
            `SELECT username, password
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];
        if(user){
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign({ username }, SECRET_KEY);
                return res.json({ message : `logged in as ${username}`, token });
            }
        }
        throw new ExpressError('Invalid username / password', 400);
    }catch(e){
        return next(e);
    }
});

router.get('/topsecret', (req, res, next)=>{
    try{
        const token = req.body._token;
        const payload = jwt.verify(token, SECRET_KEY);
        return res.json({ msg : 'SIGNED IN THIS IS TOP SECRET I LIKE LOKI' });
    }catch(e){
        return next(e);
    }
});

module.exports = router ;