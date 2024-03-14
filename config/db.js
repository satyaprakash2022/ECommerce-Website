const mongoose = require('mongoose')
const colors = require('colors');

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DB Connected ${conn.connection.host}`.bgGreen.white)
    }
    catch(err){
        console.log(`Error in Mongo DB: ${err}`.bgRed.white)
    }
}

module.exports = connectDB;