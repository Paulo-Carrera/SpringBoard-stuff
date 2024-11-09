const express = require('express');
const app = express();
const books = require('./routes/books');
const ExpressError = require('./expressError');

// Middleware to parse JSON before routes
app.use(express.json()); 

// Books route
app.use('/books', books);

// 404 handler
app.use((req, res, next) => {
    const err = new ExpressError('Not Found', 404);
    return next(err);
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: {
            message: err.message,
            status: err.status
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

