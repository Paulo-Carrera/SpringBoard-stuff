const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');
const ExpressError = require('../expressError');

// Authenticate JWT token before each route.
function authenticateJWT(req, res, next){
    try{
        const payload = jwt.verify(req.body._token, SECRET_KEY) ;
        req.user = payload ;
        console.log("YOU HAVE A VALID TOKEN!");
        return next();
    }catch(err){
        return next();
    }
}

// Require user or raise 401 (on routes requiring authentication)
function ensureLoggedIn(req, res, next){
    if(!req.user){
        const err = new ExpressError("UNAUTHORIZED!", 401);
        return next(err);
    }else{
        return next();
    }
}

// Ensure user is admin (on routes requiring admin)
function ensureAdmin(req, res, next){
    if(!req.user || !req.user.type !== 'admin'){
        return next(new ExpressError("MUST BE ADMIN!", 401));
    }
    return next();
}


module.exports = { authenticateJWT, ensureLoggedIn, ensureAdmin };