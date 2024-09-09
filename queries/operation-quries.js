const InventoryQueris = {
    insertInventory : 'INSERT INTO inventory(item_name, quantity, price_per_item, taxes, quantity_type, quantity_remaining,status) VALUES (?,?,?,?,?,?, 1)',
    updateInventory : 'UPDATE inventory SET item_name = ?, quantity = ?, price_per_item = ? , taxes = ?, quantity_type = ?, quantity_remaining = ? WHERE item_id = ?',
    deleteInventory : 'UPDATE inventory SET status = 99 WHERE item_id = ?',
    getInventories : 'SELECT item_id, item_name, quantity, price_per_item, taxes, quantity_type, quantity_remaining FROM inventory WHERE status != 99'
}

module.exports = {
    InventoryQueris
}