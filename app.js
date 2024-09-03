require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app     = express();
const cors    = require('cors');

app.use(cors({origin:'http://localhost:4200'}))
app.use(bodyParser.json())
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes')

app.use('/users',userRoutes)
app.use('/roles',roleRoutes)

app.listen(3000,()=>{
    console.log('node app running on port 3000')
})