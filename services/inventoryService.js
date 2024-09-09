const { dbConnection } = require("../db/db-connect");
const { InventoryQueris } = require("../queries/operation-quries");
const { convertObjectToArr } = require("./commonService");

const addIniventory = async (reqObj) => {
   const row = await dbConnection.query(InventoryQueris.insertInventory, convertObjectToArr(reqObj));
   return row[0].insertId;
}

const getAllInventory = async () => {
    const [rows] = await dbConnection.execute(InventoryQueris.getInventories);
    return rows;
}

const updateInventoryById = async (reqObj, id) => {
    const row = await dbConnection.query(InventoryQueris.updateInventory, [...convertObjectToArr(reqObj), id]);
    return row[0].insertId;
}

const deleteInventoryById = async (id) => {
    const row = await dbConnection.query(InventoryQueris.deleteInventory, id);
    return row[0].insertId;
} 

module.exports = {
    addIniventory,
    getAllInventory,
    updateInventoryById,
    deleteInventoryById
}