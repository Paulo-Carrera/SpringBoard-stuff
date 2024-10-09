const express = require('express');
const app = express();
const ExpressError = require('./expressError');

//app.use((req, res, next)=>{
//    console.log('THE SERVER GOT A REQUEST');
//    next();                                              // Tells express to continue with the next function
//});                                                     // In our case, it will go to app.get('/users/:username')

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





