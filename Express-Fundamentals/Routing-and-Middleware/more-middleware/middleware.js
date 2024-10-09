const ExpressError = require('./expressError'); // Import ExpressError

function logger(req, res, next){
    console.log(`RECIEVED a ${req.method} request to ${req.path}`);
    return next();
}

function checkForPassword(req, res, next){
    try {
        if(req.query.password != 'monkeybreath'){
            throw new ExpressError('Missing Password', 402);
        } else {
            return next();  // essential to continue the request
        }
    } catch (e) {
        return next(e);
    }
}

module.exports = { logger, checkForPassword };