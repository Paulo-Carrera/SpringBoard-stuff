const express = require('express');
const app = express();

app.use(express.json());

const CANDIES = [
    { name : 'Snickers' , qty : 43 , price : 1.50 },
    { name : 'Skittles' , qty : 26 , price : 0.99 }
];

app.get('/candies', function(req, res){
    return res.json(CANDIES);
});

app.post('/candies', function(req, res){
    if (req.body.name.toLowerCase() === 'Circus peanuts'){
        return res.status(403).json({ message : 'HORRIBLE CHOICE! CIRCUS PEANUTS FORBIDDEN!' });  // res.status(code)   
    }
    CANDIES.push(req.body);
    return res.status(201).json(CANDIES);   // res.status(code) 
});

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});




