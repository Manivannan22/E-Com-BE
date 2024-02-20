import http from "http"
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.DATABASE_URL
const connectDb = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(data=>{
    console.log("database connected")
}).catch(err=>{
    console.log("failed to connect")
});

export default connectDb

