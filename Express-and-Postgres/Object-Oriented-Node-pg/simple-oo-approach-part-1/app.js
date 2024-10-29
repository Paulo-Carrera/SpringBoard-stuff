const express = require('express');
const catRoutes = require('./routes/cats');

const app = express();

app.use(express.json());
app.use('/cats', catRoutes);

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
})