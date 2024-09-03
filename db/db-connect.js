const mysql  = require('mysql2/promise');

const dbConnection = mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER_NAME,
        password:process.env.DB_USER_PASSWORD,
        database:process.env.DB_NAME,
        waitForConnections:true,
        connectionLimit:10,
        queueLimit:0
    }
)

module.exports = {
    dbConnection
}
