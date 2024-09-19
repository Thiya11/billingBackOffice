const { addIniventory, getAllInventory, updateInventoryById, deleteInventoryById } = require('../services/inventoryService');

const router = require('express').Router();

router.get('/', async (req,res)=> {
   try {
      const allData = await getAllInventory();
      res.status(200).send({"success": allData});
   } catch (err) {
      res.status(404).send({"error":"Unable to get all the inventories"});
   }

})

router.post('/add', async (req,res)=> {
   try {
      const data = await addIniventory(req.body);
      res.status(200).send({"success": "Inventory added successfully"});
   }
   catch (err) {
      res.status(404).send({"error":"Unable to add new inventory"});
   }
})

router.put('/add/:id', async (req,res)=> {
    try {
      const data = await updateInventoryById(req.body, req.params.id);
      res.status(200).send({"success":"Inventory updated successfully"});
    }
    catch (err) {
      res.status(404).send({"error":"Unable to update inventory"})
    }
})

router.delete('/delete/:id', async (req,res)=> {
   try {
      const data = await deleteInventoryById(req.params.id);
      res.status(200).send({"success":"Inventory deleted successfully"});
   }
   catch (err) {
      res.status(404).send({"error":"Unable to delete inventory"})
   }
    
})

module.exports = router;