const express = require('express');
const router = new express.Router();

const USERS = [
    { id : 1 , username : 'hummingbird123' },
    { id : 2 , username : 'RavenMan' }
]

// These routes dont have to start with /users because of the router.use at the top of the file

router.get('/', (req,res)=>{
    res.json({ users : USERS })
});

router.get('/:id', (req, res)=>{
    const user = USERS.find(u => u.id === +req.params.id);
    res.json({ user });
});

module.exports = router; 