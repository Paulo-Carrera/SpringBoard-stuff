const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
});

app.get('/dogs', (req, res) => {        // This is the route that will be called because it comes first
    console.log('You asked for /dogs')
    res.send('<h1>I am dog woof woof</h1>');
});

app.get('/dogs', (req, res)=>{          // not this one
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
    ja : 'konnichiwa'
}

app.get('/greet/:language', (req, res)=>{   
    if(!greetings[req.params.language]) return res.send('Language not supported.');
    return res.send(greetings[req.params.language].toUpperCase());   
});

// Query Parameters / Query Strings
// '/search?term=pigs&sort=cute'
app.get('/search', (req, res)=>{
    const {term = 'piggies', sort = 'cute'} = req.query;     // object destucturing (default values)
    return res.send(`Searching for "${term}" and sorting by "${sort}".`);
});


app.get('/show-me-headers', (req,res)=>{
    console.log(req.rawHeaders);    // rawHeaders is an array of all the headers
    console.log(req.headers);       // headers is an object of all the headers 
    res.send(req.headers);          // sends back json of all the headers
});

app.get('/show-language', (req, res)=>{
    const lang = req.headers['accept-language'];
    res.send(`Your preferred language is ${lang}!`);    // Your preferred language is en-US,en;q=0.9!
})


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});




