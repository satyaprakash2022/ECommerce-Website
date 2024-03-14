const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productsRoutes = require('./routes/productRoutes');
const cors = require('cors');

// config env
dotenv.config();  // if .env file is inside any folder then dotenv.config(path: path.join(__dirname))

// database config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());  // we can send and recieve JSON data

// routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/category' , categoryRoutes);
app.use('/api/v1/product' , productsRoutes);

// rest api
app.get('/' , (req,res) =>{
    res.send('Hello World');
})


// const port = process.env.PORT || 8080; // if any problem is present in the .env file then it will get start with port 8080
const port = 8080;  // if we use above part it is not running
app.listen(port , () =>{
    console.log(`listening on port : ${port}`.bgCyan.white);
})