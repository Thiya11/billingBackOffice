const { dbConnection } = require("../db/db-connect");
const { rolesQueries } = require("../queries/users");
const { convertObjectToArr } = require("./commonService");

async function addRole(reqObj) {
    const rows = await dbConnection.query(rolesQueries.insertRole,convertObjectToArr(reqObj));
    return rows
}

async function updateRole(reqObj,id) {
    const rows = await dbConnection.query(rolesQueries.updateRole, [...convertObjectToArr(reqObj),id]);
    return rows
}

async function deleteRole(id) {
    const rows = await dbConnection.query(rolesQueries.deleteRole,[id])
    return rows
}

async function getAllRoles() {
    const [rows] = await dbConnection.query(rolesQueries.getAllRoles);
    return rows
}

module.exports = {
    getAllRoles,
    addRole,
    updateRole,
    deleteRole
}