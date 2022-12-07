const dataModel=require('../model/model')
const datavar=require('../model/log')
const bcrypt = require('bcrypt');
const { json } = require('express');

// const env=require('dotenv').config;
var jwt = require('jsonwebtoken');
const saltRounds = 10;
async function addproduct(req,res){
    const data=new dataModel({
        name:req.body.name,
        city:req.body.city
    })
    try{
        const datasave=await data.save();
        res.status(201).json({datasave})
    }
    catch (error) {
        res.send(error);
    }
    //    res.status(201).send({"err":0,"message":"hello"})
}
const signup=async(req,res)=>{
  const pass=req.body.password;
   const enpass= bcrypt.hashSync(pass, saltRounds);
    const data=new datavar({
        email:req.body.email,
        username:req.body.username,
        password:enpass
    })
    try {
         const datapoint=await data.save();
         res.status(201).json({datapoint})
    } catch (error) {
      res.send("HELOO"+error)
    }
}
const login=async(req,res)=>{
  try {
      const {username,password}=req.body;
      let data = await datavar.findOne({username});
      if(data){
          if(bcrypt.compareSync(password,data.password)){//compare password with hashed password
              token=jwt.sign({userId:data._id,username:data.username},process.env.SECRET_KEY,{expiresIn:"1h"})
              return res.status(200).json({message:"Login Ssucees",_token:token});
          }
      res.status(401).json({message:"unauthorized user"});
  }
} 
catch (error) {
  console.log(error);
  res.status(400).json({message:"Something went wrong"});
      
  }
}
const access=async(req,res)=>{
        var verifytoken=req.headers.authorization.split(" ")[1];
        jwt.verify(verifytoken, process.env.SECRET_KEY, function(err, decoded) {
          if(err) res.send("wrong token")
          else
          res.status(200).json({userId:decoded.userId,username:decoded.username})
          
        });
}

async function getproduct(req,res){
      const datafind= await dataModel.find({})
      try {
        res.status(200).json({datafind})
      } catch (error) {
        res.status(400).send({"mesage":"error"})
      }
        
}
async function deleteproduct(req,res){
    const id=req.params.id;
    const datafind= await dataModel.findByIdAndDelete({_id:id})
    try {
      res.status(200).json({"message":"delete the data from database"})
    } catch (error) {
      res.status(400).send({"mesage":"error"})
    }
      
}
async function updateproduct(req,res){
    try {
    const id=req.params.id;
    const updatedata=req.body;
    const option={new:true};
    const datafind= await dataModel.findByIdAndUpdate({_id:id,updatedata,option})
    res.status(200).json({"message":"data updated"})
    } catch (error) {
      res.status(400).send({"mesage":"error"})
    }
      
}
module.exports={addproduct,getproduct,deleteproduct,updateproduct,signup,login,access}