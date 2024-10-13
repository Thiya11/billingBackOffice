const InventoryQueris = {
    insertInventory : 'INSERT INTO inventory(item_name, category, price_per_item, taxes, quantity_type, quantity_remaining,status) VALUES (?,?,?,?,?,?, 1)',
    updateInventory : 'UPDATE inventory SET item_name = ?, category = ?, price_per_item = ? , taxes = ?, quantity_type = ?, quantity_remaining = ? WHERE item_id = ?',
    deleteInventory : 'UPDATE inventory SET status = 99 WHERE item_id = ?',
    getInventories : 'SELECT item_id, item_name, category, price_per_item, taxes, quantity_type, quantity_remaining FROM inventory WHERE status != 99'
};

const billingQueries = {
    insertBill : 'INSERT INTO user_bills(user_id, bill_date, total_price, total_tax, status) VALUES (?,?,?,?,1)',
    insertPurchasedItems : 'INSERT INTO purchased_items(bill_id, item_id, quantity, price, tax) VALUES ',
    getBillingDetails:'SELECT bill_id, user_id, first_name, last_name, email, bill_date, total_price, total_tax, ub.status  FROM user_bills ub JOIN Users u ON ub.user_id = u.id',
    getBillingDetailsById: 'SELECT ub.bill_id, ub.user_id, ub.bill_date, ub.total_price, ub.total_tax, ub.status, u.first_name, u.last_name, u.email, pi2.purchased_item_id, pi2.quantity, pi2.price, pi2.tax, i.item_id, i.item_name, i.price_per_item, i.category, i.quantity_type FROM user_bills ub JOIN Users u ON ub.user_id = u.id JOIN purchased_items pi2 ON ub.bill_id = pi2.bill_id JOIN inventory i ON pi2.item_id = i.item_id WHERE ub.bill_id = ?;'
}

const TransactionQuries = {
    getAllBills: 'SELECT bill_id, user_id, bill_date, total_price, total_tax FROM user_bills LIMIT ? OFFSET ? ',
    getTotalCount: 'SELECT COUNT(*) total FROM user_bills',
    getTransactionById: 'SELECT bill_id, user_id, bill_date, total_price, total_tax FROM user_bills WHERE bill_id = ?'
}

module.exports = {
    InventoryQueris,
    billingQueries,
    TransactionQuries
}