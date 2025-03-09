const express=require("express")
const userRouter=require("./routes/user")
const app=express();
const {connectMongodb}=require("./connection")
const {logReqRes}=require("./middlewares/index")
const PORT=8000;

  
//connection
connectMongodb("mongodb://127.0.0.1:27017/employee-app-1").then(()=>console.log("MongoDb connected"))


 //Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("./log.txt"));
//Routes
app.use("/user",userRouter);

app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`)
})