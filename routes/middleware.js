const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname,'..','keys','rsa.key'),'utf-8');
const publicKey  = fs.readFileSync(path.join(__dirname,'..','keys','rsa.key.pub'),'utf-8');

function signToken(payload){
    try {
        const token =  jwt.sign(payload,privateKey,{algorithm:'RS256'});
        return token;
    }catch(err){
        console.log('unable to sign JWT',err);
        return({"error":err})
    }
}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({"error":"Unauthorised access"})
    }
    try{
        const decoded = jwt.verify(token,publicKey,{algorithms:'RS256'});
        next();
    }catch(err){
        console.log('unable to verify token',err)
        return res.status(401).json({ message: 'Invalid token.' })
    }
}

module.exports = {
    signToken,
    verifyToken
}