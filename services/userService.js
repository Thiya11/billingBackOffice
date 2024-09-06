const { dbConnection } = require("../db/db-connect");
const { userQueries } = require("../queries/users");
const { signToken, hashify, createHash } = require("../routes/middleware");
const { convertObjectToArr } = require("./commonService");
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt');
const { singleSwagObj } = require("./swagger");

async function getAllUsers() {
    const [rows] = await dbConnection.execute(userQueries.getAllUsers);
    return rows;
}

async function getUsersById(id) {
    const [rows] = await dbConnection.execute(userQueries.getUsersById,[id]);
    return rows;
}

async function addUser(reqObj) {
    const encryptedPassword = await createHash(reqObj['password']);
    reqObj['password']      = encryptedPassword;
    const rows              = await dbConnection.query(userQueries.insertUser,convertObjectToArr(reqObj));
    return rows;  
}

async function updateUser(reqObj, id) {
    const [rows] = await dbConnection.execute(userQueries.updateUser,[...convertObjectToArr(reqObj),id]);
    return rows;
}

async function deleteUser(id) {
    const [rows] = await dbConnection.execute(userQueries.deleteUser,[id]);
    return rows;
}

async function loginUser(reqObj,res) {
    if(reqObj.type == 'gmail') {
        const data = jwtDecode.jwtDecode(reqObj.token);
        res.json(data);
    } else {
        const [data]  = await dbConnection.query(userQueries.userLogin,[reqObj.email]);
        if (data.length <= 0) {
            res.status(404).send({"error":"Invalid Email or Password"});
        } else {
            const hashedPass = data[0].password;
            const jwtPayload = {
                "userName":reqObj.email,
                "userId":data[0].id,
            };
            bcrypt.compare(reqObj.password,hashedPass,(err,result)=> {
                if(err) {
                   res.status(404).send({"error":"Invalid Email or Password"});
                }
                if(result) {
                    const jwtToken = signToken(jwtPayload);
                    if (jwtToken.error) {
                        res.status(404).send({"error":"Unable to Process your request"})
                    }else {
                        res.json({"success":{"userId":data[0].id, "token":jwtToken}});
                    }
                } else {
                    res.status(404).send({"error":"Invalid Email or Password"});
                }
            })
        }
    }
}

module.exports = {
    getAllUsers,
    getUsersById,
    addUser,
    deleteUser,
    updateUser,
    loginUser
}