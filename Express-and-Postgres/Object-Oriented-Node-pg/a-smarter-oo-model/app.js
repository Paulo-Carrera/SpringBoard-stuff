const express = require('express');
const catRoutes = require('./routes/cats');
const dogRoutes = require('./routes/dogs');

const app = express();

app.use(express.json());
app.use('/cats', catRoutes);
app.use('/dogs', dogRoutes);

app.use((req, res, next)=>{
    console.log(`${req.method} request made to ${req.url}`);
    next();
})

app.use(function(req, res, next){
    const err = new Error("Not Found");
    err.status = 404;
    return next(err);
});

app.use(function(err, req, res, next){
    let status = err.status || 500;
    return res.status(status).json({
        error : err.message
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000");
});