const express = require('express');
const app = express();
const catsRoutes = require('./cats');
const ExpressError = require('./expressError');

app.use(express.json()); // for parsing application/json
app.use('/cats', catsRoutes); // for all routes starting with /cats 

// 404 handler

app.use(function(req, res, next){
    return new ExpressError('Not Found', 404);
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500);

    return res.json({
        error : err.message,
    });
});


// move our app.listen code into a file called server.js so we can use supertest to test our server

module.exports = app ;



