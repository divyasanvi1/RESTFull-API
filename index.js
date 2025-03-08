const express=require("express")
const users=require("./MOCK_DATA.json")
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

 //Middleware
app.use(express.urlencoded({extended:false}));
app.get("/api/users",(req,res)=>{// need server restart
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
            return res.json(user);
        }
    })
})

app.post("/api/users",(req,res)=>{
   const body=req.body;
   console.log("Body",body);
   users.push({...body,id:users.length+1});
   fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
    return res.json({status:"sucess", id:users.length});
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