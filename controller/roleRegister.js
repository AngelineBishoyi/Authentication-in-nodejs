const {pool}=require("../config/dbConnection.js")
const bcrypt=require("bcrypt")



async function Roleregister(req,res) {
    try {
        const{name,email,password,role}=req.body;

        const [existsUser] = await pool.execute("SELECT * FROM  roleuser WHERE email=?",[email])
        if(existsUser.length>0){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword= await bcrypt.hash(password,10)

        await pool.execute("INSERT INTO roleuser(name,email,password,role)VALUES(?,?,?,?)",[name,email,hashPassword,role])

        return res.status(201).json({message:"User created successfully"})
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
        
    }
    
}

module.exports={Roleregister}
