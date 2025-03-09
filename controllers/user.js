const User=require("../models/user")

async function handleGetAllUsers(req,res){
    // need server restart
  // res.setHeader("X-MyName","Divya");// Always add X to custom Header
   const allDbUsers=await User.find({});
   return res.json(allDbUsers)
}
async function GetUserById(req,res){
    const user=await User.findById(req.params.id);
    if(!user) return res.status(404).json( {err:"User Not Found"})
    return res.json(user);
}
async function userPost(req,res){
    const body=req.body;
    console.log("Body",body);
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
    {
      return res.status(400).json({msg:"All fiels are mandatory"})
    }
    const result=await User.create({
      firstName:body.first_name,
      lastName:body.last_name,
      email:body.email,
      Gender:body.gender,
      JobTitle:body.job_title,
    });
    console.log("result",result);
    return res.status(201).json({msg:"success"});
 }

 async function userUpdate(req,res){
    console.log("Headers Received:", req.headers); 
    console.log("Body Received updates:", req.body);
    const updates=req.body;

    await User.findByIdAndUpdate(req.params.id,updates,{new:true});
    return res.status(201).json({msg:"success"});
}

async function deleteUser(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({msg:"success"});
}
module.exports={
    handleGetAllUsers,
    GetUserById,
    userPost,
    userUpdate,
    deleteUser
}