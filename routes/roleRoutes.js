const express = require('express');
const { getAllRoles, addRole, updateRole, deleteRole } = require('../services/roleService');
const router = express.Router();
const {verifyToken} = require('./middleware');
const { multiSwagObj } = require('../services/swagger');

router.get('/', verifyToken, async(req,res)=> {
    try{
        const roles = await getAllRoles();
        res.json(multiSwagObj(roles))
    }catch(err){
        console.log(err)
        res.status(500).send({"error":"Internal Server Error"})
    }
})

router.put('/addRole', verifyToken, async(req,res)=> {
    try{
        const roles = await addRole(req.body);
        res.json({"success":"New Role Added"});
    }catch(err){
        console.log(err)
        res.status(500).send({"error":"Internal Server Error"});
    }
})

router.put('/:id', verifyToken,  async(req,res)=> {
    try{
        const roles = await updateRole(req.body,req.params.id);
        res.json({"success":"Role Updated Successfully"});
    }catch(err){
        console.log(err)
        res.status(500).send({"error":"Internal Server Error"});
    }
})

router.delete('/deleteRole/:id', verifyToken, async(req,res)=> {
    try{
        const roles = await deleteRole(req.params.id);
        res.json({"success":"Role Deleted Successfully"});
    }catch(err){
        console.log(err)
        res.status(500).send({"error":"Internal Server Error"})
    }
})

module.exports = router