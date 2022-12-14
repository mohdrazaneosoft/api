const express=require('express');
const env=require('dotenv').config();
const PORT=process.env.PORT;
const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://razamohd:12QAZwsx@cluster0.gizdcu8.mongodb.net/test")
.then(res=> console.log("Database connected"+res))
.catch(err=> console.log("Database error :"+err));
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
var cors = require('cors')
const routes=require('./route/route');
app.use(cors());
app.use("/api",routes)

app.use("*",(req,res)=>{
    res.status(404).json({"message":"Page not found"})
})
app.listen(PORT,(err)=>{
    if(err){
        console.log("error"+err)
    }
    else console.log(`work on ${PORT}`);
})
