require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app     = express();
const cors    = require('cors');
app.use(cors({origin:'http://localhost:4200'}));
app.use(bodyParser.json());
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const inventoryRoutes = require('./routes/inventory');
const billingRoutes = require('./routes/billingRoutes');
const { registerNewUser } = require('./services/miscellaneous');
const { convertIncomingFields, convertOutgoingFields, errorHandler } = require('./routes/middleware');

//added middlewares

app.use(convertIncomingFields);
app.use(convertOutgoingFields);
// app.use(formatResponse);

//added custom routes

app.use('/users',userRoutes);
app.use('/roles',roleRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/billing', billingRoutes);

//register new user API

app.post('/register', async (req,res)=> {
   try{
    const result = await registerNewUser(req.body);
    res.status(200).json({"success":"User successfully registered"});
   } catch(err) {
    console.log(err)
    res.status(404).send({"error":"Unable to register user"})
   }
}) 

app.use(errorHandler);

app.listen(3000,()=>{
    console.log('node app running on port 3000')
})