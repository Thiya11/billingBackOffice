const { dbConnection } = require("../db/db-connect");
const { otherQueries } = require("../queries/miscellaneous-queries");
const { createHash } = require("../routes/middleware");

const registerNewUser = async (reqObj) => {
    let encryptedHash = await createHash(reqObj['password']);
    let userInfo      = [reqObj.firstName, reqObj.lastName, 1, reqObj.email, encryptedHash, 1];
    const row         = await dbConnection.query(otherQueries.registerUser,userInfo);
    return row;
}

module.exports = {
    registerNewUser
}