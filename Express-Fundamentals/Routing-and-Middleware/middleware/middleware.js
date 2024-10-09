function logger(req, res, next){
    console.log(`RECIEVED a ${req.method} request to ${req.path}`);
    return next();
}

module.exports = { logger }