const {pool} = require("../config/dbConnection.js")
const bcrypt = require("bcrypt")
const authenticationtoken =require("../middleware/authMiddleware.js")
const jwt = require("jsonwebtoken");


async function changePassword(req,res) {
    try {
        const userId = req.user?.userId;  
        const {oldPassword,newPassword}=req.body;

        console.log("Received Data:", { oldPassword, newPassword, userId });

        if (!oldPassword || !newPassword || !userId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

    
        const [user]= await pool.execute("SELECT * FROM user where id =?",[userId]);
        if(user.length===0){
            return res.status(404).json({message:"user not found"})
        }
        const currentuser=user[0];
    
        const isMatch = await bcrypt.compare(oldPassword,currentuser.password);
        if(!isMatch){
            return res.status(400).json({message:"Oldpassword is incorrect"})
        }
    
        const hashednewPassword= await bcrypt.hash(newPassword,10);
    
    
        await pool.execute("UPDATE user SET password =? where id =?",[hashednewPassword,userId])
        return res.json({message:"Password changed successfully"})
        
    } catch (error) {
        console.error("Error changing password",error);
        res.status(500).json({error:error.message})  
    } 
}

module.exports={changePassword}