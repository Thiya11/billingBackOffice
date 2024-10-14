const { getTransactions, getTransactionById } = require('../services/transactionService');

const router = require('express').Router();

router.get('/list/size=:limit/page=:offset', async (req,res)=> {
    try {
        const result = await getTransactions(req.params.limit, req.params.offset);
        res.status(200).send({"success":result});
    }
    catch(err) {
        console.log(err)
        res.status(404).send({"message":"Unable to get all the transactions"})
    }
})

router.get('/list/:id', async (req,res)=> {
    try {
        const result = await getTransactionById(req.params.id);
        res.status(200).send({"success":result});
    }
    catch(err) {
        console.log(err);
        res.status(404).send({"message":"Unable to find the transaction details"})
    }
})

module.exports = router;