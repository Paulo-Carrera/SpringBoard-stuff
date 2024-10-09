const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const middleware = require('./middleware'); // Import middleware functions

const userRoutes = require('./userRoutes');

app.use(express.json());
app.use(middleware.logger); // Uses the middleware in middleware.js
app.use('/users', userRoutes);  // Uses the routes in userRoutes file!


app.get('/favicon.ico', (req, res)=> res.sendStatus(204));

function attemptToSaveToDB(){
    throw 'Connection Error!'
};


// Pass in the middleware function to check the password !
app.get('/secret', middleware.checkForPassword, (req, res, next)=>{
    res.send('I LOVE YOU <3 FOR REAL MARRY ME')
});
// Pass in the middleware function to check the password !
app.get('/private', middleware.checkForPassword, (req, res, next)=>{
    res.send('YOU HAVE REACHED THE PRIVATE PAGE. IT IS PRIVATE.')
})


// Global error handler
app.use((req, res, next)=>{
    const e = new ExpressError("Page Not Found", 404);
    next(e);
});

// Generic error handler
app.use(function(err, req, res, next){
    // the default status is 500 Internal Server Error 
    let status = err.status || 500;
    let message = err.message ;

    // set the status and alert the user 
    return res.status(status).json({        // this line determines the format of the response
        error : {message, status}
    });
});

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});