const JWT = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatustext')
const verifyToken = (req, res, next) => {
    const autHeader = req.headers['Authorization'] || req.headers['authorization'];
    const token = autHeader;
    if (!autHeader){
        return res.status(400).json({ status: httpStatusText.ERROR, message: "Invalid token" });
    }
    try{
        const codedToken = JWT.verify(token, process.env.JWT_SECRET_KEY, )
        console.log({token: codedToken});
        next();
    }catch(err){
        return res.status(400).json({ status: httpStatusText.ERROR, message: "Invalid token" });
    }
}

module.exports = verifyToken;