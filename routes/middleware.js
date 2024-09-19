const fs     = require('fs');
const jwt    = require('jsonwebtoken');
const path   = require('path');
const bcrypt = require('bcrypt');

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

const createHash = async (pass) => {
    const encryptedHash = await bcrypt.hash(pass, Number(process.env.PASSWORD_SALT));
    return encryptedHash;
}

const convertIncomingFields = (req,res,next) => {
    if(req.body) {
        req.body = convertToKabobCase(req.body);
    }
    next();
}

const convertToKabobCase = (data) => {
    const newObj = {};
    Object.keys(data).forEach(key => {
        const newKey   = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        newObj[newKey] = data[key];
    });
    return newObj;
} 

const stringify = (obj) => {
    if(typeof obj == 'string') {
        try {
           obj = JSON.parse(obj);
           return obj;
        } catch(err) {
            return obj;
        }
    }
    return obj;
}

const convertOutgoingFields = (req,res,next) => {
    const oldSend = res.send;
    res.send = (data) => {
        data = stringify(data);

        if (Array.isArray(data)) {
            console.log(data, 'arr')
            data = data.map((item) => convertToCamelCase(item));
        } else if (typeof data == 'object') {
            data = convertToCamelCase(data);
        }
        oldSend.call(res, JSON.stringify(data));
    };
    next();
}

const convertToCamelCase = (data) => {
    const newObj = {};
    Object.keys(data).forEach(key => {
        if (Array.isArray(data[key])) {
            let tempArr = [];
            data[key].forEach(item => {
               let tempObj = convertToCamelCase(item);
               tempArr.push(tempObj);
            })
            data[key] = tempArr;
        }
        const newKey   =   key.toLowerCase().replace(/([-_][a-z])/g, group =>
            group
              .toUpperCase()
              .replace('-', '')
              .replace('_', '')
          );
        newObj[newKey] = data[key];
    });
    return newObj;
}


const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({error: err.message || 'Something went wrong'});
}

module.exports = {
    signToken,
    verifyToken,
    createHash,
    convertIncomingFields,
    convertOutgoingFields,
    convertToKabobCase,
    errorHandler
}