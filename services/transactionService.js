const { dbConnection } = require("../db/db-connect")
const { TransactionQuries } = require("../queries/operation-quries")

const getTransactions = async (size, page) => {
    const limit    = parseInt(size) || 25;
    const currPage = parseInt(page) || 1;
    const offset   = (currPage - 1) * limit;
    const [rows] = await dbConnection.query(TransactionQuries.getAllBills, [limit, offset]);
    const count  = await dbConnection.execute(TransactionQuries.getTotalCount);
    const totalItems = count[0][0]['total'];
    const totalPages = Math.ceil(totalItems / limit);

    return {
        transactionsList: rows, 
        totalTransaction: totalItems,
        page: currPage,
        totalPages: totalPages
    };
} 

const getTransactionById = async (id) => {
    const [rows] = await dbConnection.query(TransactionQuries.getTransactionById, [id]);
    return {transactionsList: rows};
}

module.exports = {
    getTransactions,
    getTransactionById
}