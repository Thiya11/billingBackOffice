const otherQueries = {
    registerUser: 'INSERT INTO Users (first_name,last_name,role_id,email,password,status) VALUES (?,?,?,?,?,?)'
}

const graphDataQueries = {
    getTransactionAmount : `SELECT $FORMAT SUM(total_price) AS total_price, SUM(total_tax) AS total_tax FROM user_bills ub WHERE ub.bill_date >= ? AND ub.bill_date <= ? AND ub.status = 1 $ORDERBY`,
    getTotalTransactionQuery : 'SELECT $FORMAT COUNT(bill_id) AS transactions FROM user_bills ub WHERE ub.bill_date >= ? AND ub.bill_date <= ? AND ub.status = 1 $ORDERBY',
    getCategorySales: 'SELECT SUM(pi2.price) AS total_price, SUM(pi2.tax) AS total_tax, i.category FROM user_bills ub  JOIN purchased_items pi2 ON pi2.bill_id = ub.bill_id  JOIN inventory i ON i.item_id = pi2.item_id WHERE ub.bill_date >= ? AND ub.bill_date <= ? AND ub.status = 1 GROUP BY i.category;',
    getInventoryQuant: 'SELECT category, item_id, item_name, quantity_remaining, quantity_type FROM inventory WHERE status = 1'
}

module.exports = {
    otherQueries,
    graphDataQueries
}