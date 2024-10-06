const { addNewBill, getBillById, getAllBills } = require('../services/billingService');

const router = require('express').Router();

router.get('/', async(req,res) => {
    try {
        const rows = await getAllBills();
        res.status(200).send({"success":rows});
    }
    catch (err) {
        res.status(404).send({"error":"Unable to get bill details"})
    }
});

router.get('/:id', async(req,res) => {
    try {
        const row = await getBillById(req.params.id);
        res.status(200).send({"success":row}); 
    }
    catch(err) {
        res.status(404).send({"error":"Unable to get data"})
    }
})

router.post('/add', async (req,res) => {
    try {
        const row = await addNewBill(req.body, res);
        if (row?.message) {
            res.status(404).send({"error":row.message});
        }
        res.status(200).send({"success":{"message":"Bill added successfully", "billId":row[0].insertId}})
    }
    catch(err) {
        let error = err.custom ? err.custom : {"error":"Unable to add bill"};
        res.status(404).send(error);
    }
});


module.exports = router;