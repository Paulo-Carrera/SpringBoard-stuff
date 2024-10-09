const app = require('./app');

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});

// now we call nodemon on server.js