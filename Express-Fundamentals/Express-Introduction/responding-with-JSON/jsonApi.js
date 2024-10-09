const express = require('express');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended : true }));

const CANDIES = [
    { name : 'Snickers', qty : 43, price : 1.50 },
    { name : 'Skittles', qty : 26, price : 0.99 }
];

app.get('/candies', (req, res)=>{
    res.json(CANDIES);
});

app.post('/candies', (req,res)=>{
    CANDIES.push(req.body);
    res.json(CANDIES);              // res.json guarantees a JSON response
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});

