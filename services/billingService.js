const { dbConnection } = require("../db/db-connect");
const { billingQueries } = require("../queries/operation-quries");

const getAllBills = async () => {
    let [billData] = await dbConnection.query(billingQueries.getBillingDetails);
    return billData;
}

const addNewBill = async (reqObj, res) => {
    let billingDate       = new Date(reqObj.bill_date);
    const billData        = await dbConnection.query(billingQueries.insertBill, [reqObj.user_id, billingDate, reqObj.total_price, reqObj.total_tax]);
    const billId          = billData[0].insertId;
    const unavailableItem = await itemAvailableCheck(reqObj.purchased_items);
    if (unavailableItem.length) {
        throw Error ({"message":"Unable to purches the selected item"})
    } else {
        const values               = reqObj.purchased_items.map(({itemId, quantity, price, tax}) => `(${billId}, ${itemId}, ${quantity}, ${price}, ${tax})`).join(", ");
        const quantityCase         = reqObj.purchased_items.map((item) => `WHEN item_id = ${item.itemId} THEN quantity_remaining - ${item.quantity}`).join(" ");
        const itemIds              = reqObj.purchased_items.map(item => item.itemId)
        const conditionCase        = reqObj.purchased_items.map((item) => `WHEN item_id = ${item.itemId} THEN ${item.quantity}`).join(" ");
        const updateInventoryItems = await dbConnection.query( `UPDATE inventory SET quantity_remaining = CASE ${quantityCase} END WHERE item_id IN (${itemIds.join(', ')}) AND quantity_remaining >= CASE ${conditionCase} END;`)
        const insertedItems        = await dbConnection.query(billingQueries.insertPurchasedItems + values);
        return billData;
    }
}

const itemAvailableCheck = async (purchasedItems) => {
    let itemUnavailable = [];
    for (let item of purchasedItems) {
        const [checkItemAvail] = await dbConnection.query(`SELECT item_name,quantity_remaining,status FROM inventory WHERE item_id = ${item.itemId}`);
        if (checkItemAvail[0].status == 99 || checkItemAvail[0].quantity_remaining < item.quantity) {
             itemUnavailable.push(checkItemAvail[0].item_name);
             return itemUnavailable;
        } 
    }  
    return itemUnavailable;
} 

const getBillById = async (billId) => {
    const [rows] = await dbConnection.query(billingQueries.getBillingDetailsById, billId);
    console.log(rows[0], 'bill details')
    let reqObj = {
        billId: rows[0].bill_id,
        userId: rows[0].user_id,
        billDate: rows[0].bill_date,
        totalPrice: rows[0].total_price,
        totalTax: rows[0].total_tax,
        status: rows[0].status,
        user: {
            firstName: rows[0].first_name,
            lastName: rows[0].last_name,
            email: rows[0].email,
        },
        purchasedItems: rows.map(row => ({
            purchasedItemId: row.purchased_item_id,
            itemId: row.item_id,
            itemName: row.item_name,
            category: row.category,
            pricePerItem: row.price_per_item,
            quantityType: row.quantity_type,
            quantity: row.quantity,
            price: row.price,
            tax: row.tax
        }))

    };

    return reqObj;
}

module.exports = {
    addNewBill,
    getAllBills,
    getBillById
}