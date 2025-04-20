// const mongoose = require('mongoose')
// const colors = require('colors');

// const connectDB = async() =>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGO_URL)
//         console.log(`DB Connected ${conn.connection.host}`.bgGreen.white)
//     }
//     catch(err){
//         console.log(`Error in Mongo DB: ${err}`.bgRed.white)
//     }
// }

// module.exports = connectDB;
const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config(); // Ensure environment variables are loaded

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DB Connected: ${conn.connection.host}`.bgGreen.white);
    } catch (err) {
        console.log(`Error in MongoDB: ${err.message}`.bgRed.white);
    }
};

module.exports = connectDB;
