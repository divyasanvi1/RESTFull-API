const express=require("express")
const {handleGetAllUsers,GetUserById,userPost,userUpdate,deleteUser}=require("../controllers/user")
const router=express.Router()

// router.get("/",async(req,res)=>{
//     const allDbUsers=await User.find({});
//       const html=`
//         <ul>
//        ${allDbUsers.map((user)=>`<li>${user.firstName}-${user.email}</li>`).join("")} 
//        </ul>
//     `;
//       res.send(html)
//      })


router.get("/",handleGetAllUsers)

router.get("/:id",GetUserById)

router.post("/",userPost)

router.patch("/:id",userUpdate)

router.delete("/:id",deleteUser)

module.exports=router;
