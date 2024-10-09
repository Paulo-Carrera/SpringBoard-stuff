const express = require('express');
const app = express();
const catsRoutes = require('./cats');
const ExpressError = require('./expressError');

app.use(express.json()); // for parsing application/json
app.use('/cats', catsRoutes);

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

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});