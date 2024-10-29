const express = require('express');
const app = express();
const routes = require('./routes/auth');
const ExpressError = require('./expressError');
const { authenticateJWT } = require('./middleware/auth');

app.use(express.json());
app.use(authenticateJWT); // placement before routes important !
// All routes after this line will require authentication .
app.use('/', routes);

// 404 handler
app.use(function (req, res, next){
    const err = new ExpressError('Not Found!', 404);
    return next(err);
});

// general errir handler 
app.use((err, req, res, next)=>{
    let status = err.status || 500;

    return res.status(status).json({
        error : {
            message : err.message,
            status : status
        }
    });
});

module.exports = app;