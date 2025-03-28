const express = require("express")
const {authenticationtoken}=require("../middleware/authMiddleware")
const {authorizeRoles} = require("../middleware/roleAuthMiddleware")



const adminRoute=express.Router()


adminRoute.get("/dashboard",authenticationtoken,authorizeRoles("admin"),(req,res)=>{
    res.json({message:"Welcome Admin",user:req.user})
})

module.exports={adminRoute}
