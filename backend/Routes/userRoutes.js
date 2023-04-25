const express = require("express");
const Registeruser = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../MiddleWare/middleWare")
const router = express.Router();

//user Registration
router.post("/registration",async(req,res)=>{
    try{
        const{username,password,confirmpassword} = req.body;
        let exit = await Registeruser.findOne({username});
        if(exit){
            return res.status(400).json({ error: "User Already Exists" });
        }
        if(password !== confirmpassword){
            return res.status(400).json({ error: "Passwords are not Matched" });
        }

        //hashing password
        const hashedPassword = await bcrypt.hash(password,10);

        let newUser = await Registeruser.create({
            username,
            password: hashedPassword,
            confirmpassword: hashedPassword
        });
        res.status(200).json({ newUser, message: "User Registered Successfully" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//user Login
router.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body;
        let exit = await Registeruser.findOne({username});
        if(!exit){
            return res.status(400).json({ error: "User Not Exists" });
        }
        const isMatch = await bcrypt.compare(password, exit.password);
        if(!isMatch){
            return res.status(400).json({ error: "Invalid Password" });
        }
        let payload={
            user:{
                id:exit.id
            }
        }
        jwt.sign(payload,process.env.access_token_secreat,{expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                return res.json({ token, message: "Login Successfully" });
            })
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//particular user get in
router.get("/currentuser",middleware, async(req,res)=>{
    try{
        const user = await Registeruser.findById(req.user.id)
        if(!user){
            return res.status(400).json({ error: "User Not Available" });
        }
       return res.json({ user });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
