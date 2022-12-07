const mongoose=require('mongoose');
const dataschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model('data',dataschema);