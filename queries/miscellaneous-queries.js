const otherQueries = {
    registerUser: 'INSERT INTO Users (first_name,last_name,role_id,email,password,status) VALUES (?,?,?,?,?,?)'
}

module.exports = {
    otherQueries
}