const express = require('express'); // import express
const app = express(); // create express app
const expressError = require('./expressError'); // import expressError

app.use(express.json()); // parse json

const uRoutes = require('./routes/users'); // import user routes
app.use('/users', uRoutes); // use user routes

const mRoutes = require('./routes/messages'); // import messages routes
app.use('/messages', mRoutes); // use messages routes



// 404 handler
app.use(function(req, res, next){ 
    const err = new expressError('Not Found', 404);
    return next(err);
});

// general error handler
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    return res.json({
        error : err.message
    });
});

// start server on port 3000
app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});


