const express = require('express');
const { getAllUsers, getUsersById, addUser, updateUser, deleteUser, loginUser } = require('../services/userService');
const { verifyToken } = require('./middleware');
const router = express.Router();

router.get('/', verifyToken, async(req,res)=> {
    try{
        const users = await getAllUsers();
        res.status(200).send({"success":users});
    }catch(err){
        res.status(500).send({"error":"internal server error"})
    }
})

router.get('/:id', verifyToken, async(req,res)=> {
    try{
        const users = await getUsersById(req.params.id);
        if (Object.entries(users[0]).length < 1) {
            res.status(404).send({"error":"Unable to get the user details"})
        }
        res.status(200).send({"success" : users[0]});
    }catch(err){
        res.status(500).send({"error":"internal server error"})
    }
})

router.put('/addUser', async(req,res)=> {
    try{
        const users = await addUser(req.body);
        res.json({"success":"user added successfully"});
    }catch(err){
        res.status(500).send({"error":"internal server error"})
    }
})

router.put('/:id', verifyToken, async(req,res)=> {
    try{
        const users = await updateUser(req.body, req.params.id);
        res.json({"success":"User Successfully Updated."});
    }catch(err){
        res.status(500).send({"error":"internal server error"})
    }
})

router.delete('/delete/:id', verifyToken, async(req,res)=> {
    try{
        const users = await deleteUser(req.params.id);
        res.json({"success":"User Deleted Successfully"});
    }catch(err){
        res.status(500).send({"error":"Internal server error"})
    }
})

router.post('/login',async(req,res)=> {
    await loginUser(req.body,res)
})

module.exports = router