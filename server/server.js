const express = require("express");
const cors =require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const router =require("./router/auth-router");
const adminRouter = require("./router/admin-router");
const cookieParser = require("cookie-parser")
dotenv.config();
const user= require('./model/cuser-model');

const PORT = process.env.PORT;
const app=express();

// CORS allows the Vite frontend to call this Express API during development.
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

// express.json reads JSON request bodies. cookieParser reads JWT cookies.
app.use(express.json());
app.use(cookieParser());


// MongoDb Connection 
mongoose.connect(process.env.MONGO_DB_URL).then(()=> console.log("Mongo DB Connected"))
.catch((e)=> console.log("Error To connect MongoDB: ",e));


app.use("/api/auth",router);
// All admin endpoints live behind /api/admin and are protected in admin-router.js.
app.use("/api/admin", adminRouter);


app.post('/api/adduser',async(req,res)=>{
    const {fname,email,phone,city}=req.body;

    const data={
        fname:fname,
        email:email,
        phno:phone,
        city:city
    }
    const Exist = await user.findOne({email})
    if(Exist){
        return res.json({message:"Email Already Exist"})
    }
    else{
        // Guest/contact user creation uses cuser-model, separate from auth users.
        await user.create(data);
        console.log("User Added");  
        return res.json({message:"User Added"});
    }

});
app.get("/",(req,res)=>{
    console.log("This sisaifhfas");
})
app.listen(PORT,()=> {
    console.log(`Server is runing on port ${PORT}`)
});
