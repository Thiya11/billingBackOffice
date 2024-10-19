const router = require('express').Router();
const { getTransactionAmount,
       getTotalTransactions, 
       getTotalCategorySales, 
       getInventoryQuantity } = require('../services/graphService');

router.post('/transactionAmount', async(req,res) => {
    try {
        const rows = await getTransactionAmount(req.body);
        res.status(200).send({"success":rows});
    } catch (err) {
        res.status(404).send({"error":"Unable to get Transaction Amount data"})
    }

});

router.post('/totalTransactions', async (req,res) => {
    try {
        const rows = await getTotalTransactions(req.body);
        res.status(200).send({"success":rows});
    } catch (err) {
        res.status(404).send({"error":"Unable to get total transactions"})
    }
});

router.post('/totalCategorySales', async(req,res) => {
    try {
        const rows = await getTotalCategorySales(req.body);
        res.status(200).send({"success":rows});
    } catch (err) {
        res.status(404).send({"error":"Unable to get total category sales"})
    }
})

router.get('/inventoryQuantity/:id', async(req,res)=> {
    try{
        const rows = await getInventoryQuantity(req.params.id);
        if (rows?.message) {
            console.log(rows.message)
            res.status(404).send({"error":rows.message})
        }
        res.status(200).send({"success":rows});
    } catch (err) {
        res.status(404).send({"error":"Unable to get inventory quantity"});
    }
})

module.exports = router;