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
    res.send('You created a chicken! (get request)');
});

app.post('/chickens', (req, res)=>{
    res.send('You created a new chicken! (not really) (post request)')
});




app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});



