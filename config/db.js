const mongoose=require('mongoose');
require('dotenv').config();

const mongoURL=process.env.DB_URL;


mongoose.connect(mongoURL)

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("connection started");
})
db.on('error',(err)=>{
    console.log("connection error",err);
})
db.on('disconnected',()=>{
    console.log("disconnection");
})

module.exports=db;