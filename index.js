const express=require("express")
const users=require("./MOCK_DATA.json")
const mongoose=require("mongoose");
const fs=require("fs")
const app=express();

const PORT=8000;

// app.get("/users",(req,res)=>{
//     const html=`
//     <ul>
//       ${users.map((user)=>`<li>${user.first_name}</li>`).join("")} 
//     </ul>
//     `;
//     res.send(html)
//  })

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
})

const User=mongoose.model("user",userSchema);



 //Middleware
app.use(express.urlencoded({extended:false}));
app.use((req,res,next)=>{
    console.log("Hello From middleware 1");
    fs.appendFile("./log.txt",`\n${Date.now()}: ${req.ip}: ${req.method} : ${req.path}\n`,(err,data)=>{
        next();
    })
    
})
app.get("/api/users",(req,res)=>{// need server restart
   res.setHeader("X-MyName","Divya");// Always add X to custom Header
    fs.readFile("./MOCK_DATA.json","utf8",(err,data)=>{
        if(err)
        {
            console.log("err",err);
        }
        else{
            return res.json(users);
        }
    })
})

app.get("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    fs.readFile("./MOCK_DATA.json","utf8",(err,data)=>{
        if(err)
        {
            console.log("err",err);
        }
        else{
            const users=JSON.parse(data)
            const user=users.find((user)=>user.id===id)
            if(!user) return res.status(404).json( {err:"User Not Found"})
            return res.json(user);
        }
    })
})

app.post("/api/users",(req,res)=>{
   const body=req.body;
   console.log("Body",body);
   if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title)
   {
     return res.status(400).json({msg:"All fiels are mandatory"})
   }
   users.push({...body,id:users.length+1});
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
    return res.status(201).json({status:"sucess", id:users.length});
   })
})

app.patch("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    const updates=req.query;
    fs.readFile("./MOCK_DATA.json","utf8",(err,data)=>{
        if(err)
        {
            console.log("err",err);
        }
        else{
            let users=JSON.parse(data)
            const userIndex=users.findIndex((user)=>user.id===id)
            users[userIndex]={...users[userIndex],...updates};
            fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
                users=users;
                return res.json({status:"UPDATED", id:id});
               })
        }
    })
})

app.delete("/api/users/:id",(req,res)=>{
    const id=Number(req.params.id);
    fs.readFile("./MOCK_DATA.json","utf8",(err,data)=>{
        if(err)
        {
            console.log("err",err);
        }
        else{
            let users=JSON.parse(data)
            const UpdatedUser=users.filter((user)=>user.id!==id)
            fs.writeFile("./MOCK_DATA.json",JSON.stringify(UpdatedUser),(err)=>{
                users=UpdatedUser;
                return res.json({status:"DELETED", id:id});
               })
        }
    })
})

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`)
})