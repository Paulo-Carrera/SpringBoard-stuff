const express = require('express');

const app = express();

app.get('/dogs', (req, res) => {
    console.log('Someone made a request to /dogs!')       // logs to console
    console.log(req)    // request object from express
    res.send('<ul><li>Loki</li><li>Rex</li><li>Sparky</li></ul>');    // sends response (html, json, text, etc)
});

app.listen(3000, function(){
    console.log('App on port 3000');
});