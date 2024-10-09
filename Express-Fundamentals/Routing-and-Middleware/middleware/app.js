const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const middleware = require('./middleware');

const userRoutes = require('./userRoutes');

app.use(express.json());
app.use(middleware.logger); // Uses the middleware in middleware.js
app.use('/users', userRoutes);  // Uses the routes in userRoutes file!


app.get('/favicon.ico', (req, res)=> res.sendStatus(204));

function attemptToSaveToDB(){
    throw 'Connection Error!'
};

const USERS = [
    { username : 'StacysMom', city : 'Reno' },
    { username : 'Rosalia', city : 'R' },
];

app.get('/users/:username', function(req, res, next){
    try{
        const user = USERS.find(u => u.username === req.params.username);
        if(!user) throw new ExpressError("invalid username", 404);
        return res.send({ user })
    }catch(err){
        next(err);
    }
});

app.get('/secret', (req, res, next) => {
    debugger;
    try{
        if(req.query.password !== 'popcorn'){
            throw new ExpressError('invalid password', 403)
        }
        return res.send('CONGRATS YOU KNOW THE PASSWORD');
    }catch(err){
        next(err);
    }
});

app.get('/savetodb', (req, res, next)=>{
    try{
        attemptToSaveToDB();
        return res.send('SUCCESSFULLY SAVED TO DB');
    }catch(err){
        return next(new ExpressError("Database Error", 500));
    }
})

// Global error handler
app.use((req, res, next)=>{
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})

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