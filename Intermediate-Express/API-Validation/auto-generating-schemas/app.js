const express = require('express');
const app = express();
const books = require('./routes/books');
const ExpressError = require('./expressError');
const { stat } = require('fs');

app.use('/books', books);
app.use(express.json());

app.use((req, res, next)=>{
    const err = new ExpressError('Not Found', 404);
    return next(err);
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    return res.json({
        error : {
            message : err.message,
            status : err.status
        }
    });
});

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});


