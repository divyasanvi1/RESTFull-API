const fs=require("fs");

function logReqRes(filename){
    return (req,res,next)=>{
        fs.appendFile(filename,`\n${Date.now()}: ${req.ip}: ${req.method} : ${req.path}\n`,(err,data)=>{
            //Closures allow inner functions to remember variables from their parent functions, even after the parent has returned. ex-filename
            //The middleware still has access to filename = "./log.txt", even though logReqRes finished long ago. because this middleware gets returned to app.use when 
            //server just started
            next();
        })
    };
}

module.exports={
    logReqRes,
}