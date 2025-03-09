const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    JobTitle:{
        type:String,
    },
    Gender:{
        type:String,
    }
},{timestamps:true})

const User=mongoose.model("user",userSchema);

module.exports=User;