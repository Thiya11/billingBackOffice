const { dbConnection } = require("../db/db-connect");
const { graphDataQueries } = require("../queries/miscellaneous-queries");

const getTransactionAmount = async (reqObj) => {
    let startDate = new Date(reqObj.start_date);
    let endDate   = new Date(reqObj.end_date);
    let diffrence = Math.floor(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let transactionDetails;
    if (diffrence < 60) {
        let query = graphDataQueries.getTransactionAmount
                    .replace('$FORMAT', 'DATE(bill_date) AS billed_date,')
                    .replace('$ORDERBY', 'GROUP BY DATE(bill_date) ORDER BY billed_date');
        const result = await dbConnection.query(query, [startDate, endDate]);
        transactionDetails = result[0].map((transaction)=> {
        const dateOnly = new Date(transaction.billed_date).toLocaleString().split(',')[0];
        return {
            ...transaction,
            billed_date: dateOnly
        }
    })
    } else {
        let tempQuery = graphDataQueries.getTransactionAmount
                        .replace('$FORMAT', 'WEEK(bill_date) AS week_number, YEAR(bill_date) AS transaction_year,')
                        .replace('$ORDERBY', 'GROUP BY YEAR(bill_date), WEEK(bill_date) ORDER BY transaction_year, week_number')
        const result = await dbConnection.query(tempQuery, [startDate, endDate]);
        return result[0].map((transaction) => {
            let tempObj = {
                total_price: transaction.total_price,
                total_tax  : transaction.total_tax,
                billed_date : transaction.week_number + ',' + transaction.transaction_year
            }
            return {
                ...tempObj
            }
        });
    }

    return transactionDetails;
}

const getTotalTransactions = async (reqObj) => {
    let startDate = new Date(reqObj.start_date);
    let endDate   = new Date(reqObj.end_date);
    let diffrence = Math.floor(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    let transactionDetails;
    if (diffrence < 60) {
        let tempQuery = graphDataQueries.getTotalTransactionQuery
                        .replace('$FORMAT', 'DATE(bill_date) AS billed_date,')
                        .replace('$ORDERBY', 'GROUP BY DATE(bill_date) ORDER BY billed_date')

        console.log(tempQuery)
        const result = await dbConnection.query(tempQuery, [startDate, endDate]);
        transactionDetails = result[0].map((transaction) => {
            const dateOnly = new Date(transaction.billed_date).toLocaleString().split(',')[0];
            return {
                ...transaction,
                billed_date: dateOnly
            }
        });
        return transactionDetails;
    }else {
        let tempQuery = graphDataQueries.getTotalTransactionQuery
                        .replace('$FORMAT', 'WEEK(bill_date) AS week_number, YEAR(bill_date) AS transaction_year,')
                        .replace('$ORDERBY', 'GROUP BY YEAR(bill_date), WEEK(bill_date) ORDER BY transaction_year, week_number')
        const result = await dbConnection.query(tempQuery, [startDate, endDate]);
        return result[0].map((transaction) => {
        let tempObj = {
            transactions : transaction.transactions,
            billed_date : transaction.week_number + ',' + transaction.transaction_year
        }
        return {
        ...tempObj
        }
        });
    }
};

const getTotalCategorySales = async (reqObj) => {
    let startDate = new Date(reqObj.start_date);
    let endDate   = new Date(reqObj.end_date);
    let result    = await dbConnection.query(graphDataQueries.getCategorySales, [startDate, endDate]);
    return result[0];
}

const getInventoryQuantity = async (categoryId) => {
    if (Number(categoryId) > 0) {
        let tempQuery = graphDataQueries.getInventoryQuant + ' AND category = ' + categoryId;
        let result = await dbConnection.query(tempQuery);
        if (result[0].length) {
            return result[0];
        } else {
            throw Error({"message":"unable to get data"})
        }
    } else if (Number(categoryId) === 0) {
        let result = await dbConnection.query(graphDataQueries.getInventoryQuant)
        return result[0];
    } else {
        throw Error({"message":"unable to get data"})
    }
}

module.exports = {
    getTransactionAmount,
    getTotalTransactions,
    getTotalCategorySales,
    getInventoryQuantity
}