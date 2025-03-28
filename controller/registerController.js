const {pool}=require("../config/dbConnection.js")
const bcrypt=require("bcrypt")



async function registerUser(req,res) {
    try {
        const{name,email,password}=req.body;

        const [existsUser] = await pool.execute("SELECT * FROM  user WHERE email=?",[email])
        if(existsUser.length>0){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword= await bcrypt.hash(password,10)

        await pool.execute("INSERT INTO user(name,email,password)VALUES(?,?,?)",[name,email,hashPassword])

        return res.status(200).json({message:"User created successfully"})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
        
    }
    
}

module.exports={registerUser}
