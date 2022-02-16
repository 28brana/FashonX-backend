const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const cors = require('cors')
const app=express();
app.use(cors())

const PORT=process.env.PORT||5000;
const db = require('./config/db');

app.use(express.json());


app.use('/api/auth',require('./routes/auth'))
app.use('/api/user',require('./routes/user'));
app.use('/api/products',require('./routes/product'));
app.use('/api/carts',require('./routes/cart'));
app.use('/api/orders',require('./routes/order'));


app.listen(PORT,()=>{
    console.log("Server is Running ...");
})