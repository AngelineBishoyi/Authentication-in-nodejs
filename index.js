const express = require("express");
const cors= require("cors");
const { RegRouter, RoleRoute } = require("./routes/registerRouter");
const { LogRouter, roleRouter } = require("./routes/loginRouter");
const userrouter = require("./routes/userRoute");
const {adminRoute} = require("./routes/adminRouter");
const { changeRoute } = require("./routes/changePassROute");


const app= express();

app.use(cors());
app.use(express.json())


app.use("/users",RegRouter)
app.use("/api",LogRouter)
app.use("/api",userrouter)



app.use("/roleregister",RoleRoute)
app.use("/api",roleRouter)
app.use("/api",adminRoute)


app.use("/change",changeRoute)


const PORT=8000;

app.listen(PORT,()=>{
    console.log('Server is running on port', +PORT);
    
})