const express = require('express');

const app = express();


// This should ALWAYS be at the bottom of the file
app.listen(3000, () => {                         
    console.log('Server running on port 3000 mothafuckah!');
});
