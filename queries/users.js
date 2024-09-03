const userQueries = {
    getAllUsers: 'SELECT id,role_id,first_name,last_name,email,status FROM Users WHERE status != 99',
    getUsersById: 'SELECT id,role_id,first_name,last_name,email,status FROM Users WHERE id = ? AND status != 99',
    insertUser: 'INSERT INTO Users (first_name,last_name,role_id,email,password,status) VALUES (?,?,?,?,?,?)',
    updateUser: 'UPDATE Users SET first_name = ?, last_name = ?, role_id = ? , email = ? , status = ? WHERE id = ?',
    deleteUser: 'UPDATE Users SET status = 99 WHERE id = ?',
    userLogin: 'SELECT id,password FROM Users WHERE email = ?'
}

const rolesQueries = {
    getAllRoles: 'SELECT * FROM roles WHERE status = 1',
    insertRole: 'INSERT INTO roles (role_name,status) VALUES (?,?)',
    updateRole: 'UPDATE roles SET role_name = ?, status = ? WHERE role_id = ?',
    deleteRole: 'UPDATE roles SET status = 0 WHERE role_id = ?'
}

module.exports = {
    userQueries,
    rolesQueries
}