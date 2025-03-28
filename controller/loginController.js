const {pool} = require("../config/dbConnection.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function loginUser(req,res) {
    try {
        const {email,password}=req.body;

        const [user]= await pool.execute("SELECT * FROM user where email = ?",[email]);
        if(user.length===0){
            return res.status(400).json({message:"Invalid email or password"})

        }
        const users=user[0];

        const isMatch = await bcrypt.compare(password,users.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({userId:users.id,email:users.email},process.env.JWT_SECRET,{expiresIn:"1h"});
        return res.status(200).json({message:"Login Succesfull",token})
        
    } catch (error) {
        console.error("Error in login",error);
        res.status(500).json({error:error.message})
        
        
    }
    
}

module.exports={loginUser}
