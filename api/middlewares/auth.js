const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async(req, res, next) => {
    let token;
    let authorization = req.headers.authorization;

    if (authorization && authorization.startsWith('Bearer')) {
        token = authorization.split(' ')[1];
    }
    else if(req.cookies.token) {
        token = req.cookies.token;
    }

    if(!token) 
        res.json('Not authorize to access this route');

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('decoded', decoded);
        req.user = await User.findById(decoded._id);
        //  req.userId = decoded.subject;
        console.log('decoded._id', decoded._id);
        console.log('req.user', req.user)
        next();
    } catch (error) {
        res.json({message: 'Not authorize', error: error});
    }
}