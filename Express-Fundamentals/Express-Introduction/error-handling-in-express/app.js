const express = require('express');
const app = express();

app.use(express.json());

function attemptToSaveToDB(){
    throw 'Connection Error!'
};

const USERS = [
    { username : 'StacysMom', city : 'Reno' },
    { username : 'Rosalia', city : 'R' },
];

app.get('/users/:username', function(req, res, next){
    const user = USERS.find(u => u.username === req.params.username);
    if(!user) throw 'Invalid username'      // default express error handling (code 500) and 'Invalid username'
    return res.send({ user });
});

app.get('/secret', (req,res) => {
    
    if (req.query.password != 'popcorn'){
        return res.status(403).send('INVALID PASSWORD!')
    }
    return res.send('CONGRATS, YOU KNOW THE PASSWORD')
});

app.get('/savetodb', (req, res)=>{
    attemptToSaveToDB();
    res.send('SAVED TO DATABASE.')
})




app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});
