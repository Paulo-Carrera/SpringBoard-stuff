const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
});

app.get('/dogs', (req, res) => {        // This is the route that will be called because it comes first
    console.log('You asked for /dogs')
    res.send('<h1>I am dog woof woof</h1>');
});

app.get('/dogs', (req, res)=>{
    res.send('MEOW MEOW MEOW');
});

app.get('/chickens/arecool', function createChicken(req, res){
    // with nodemon, no need to manually restart server
    res.send('I am changing this route after installing nodemon!');     
});

app.post('/chickens', (req, res)=>{
    res.send('You created a new chicken! (not really) (post request)')
});

// URL Parameters
const greetings = {
    en : 'hello',
    fr : 'bonjour',
    ic : 'hallo',
    js : 'konnichiwa'
}

app.get('/greet/:language', (req, res)=>{   // :lang is a URL parameter we use to specify what language we want
    res.send(greetings[req.params.language]);   // req.params.lang is the value of the URL parameter
});



app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});

