const auth1 = (req, res, next) => { 
    const { token } = req.query;

if(!token) {
    return res.status(400).json({message: 'Invalid request'});

 }
 if(token !== "12345") {
    return res.status(401).json({message: 'Unauthorized'});
}
next();
}

const auth2 = (req, res, next) => { 
    const { token } = req.params;

if(!token) {
    return res.status(400).json({message: 'Invalid request'});

 }
 if(token !== "12345") {
    return res.status(401).json({message: 'Unauthorized'});
}
next();
}

module.exports = { auth1, auth2};