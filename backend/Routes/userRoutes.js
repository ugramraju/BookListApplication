const express = require("express");
const Registeruser = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const middleware = require("../MiddleWare/middleWare")
const router = express.Router();

//user Registeration
router.post("/registration",async(req,res)=>{
    try{
        const{username,password,confirmpassword} = req.body;
        let exit = await Registeruser.findOne({username});
        if(exit){
            return res.status(400).send("User Already Exists")
        }
        if(password !== confirmpassword){
            return res.status(400).send("Passwords are not Matched")
        }

        //hasshing password
        const hassedPassword = await bcrypt.hash(password,10);

        let newUser =await Registeruser.create({
            username,
            password:hassedPassword,
            confirmpassword:hassedPassword
        })
        res.status(200).json({newUser, msg:"User Registered Successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Errors")
    }
})

//user Login

router.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body;
        let exit = await Registeruser.findOne({username});
        if(!exit){
            return res.status(400).send("User Not Exists")
        }
        const isMatch = await bcrypt.compare(password, exit.password);
        if(!isMatch){
            return res.status(400).send("Invalid Password")
        }
        let payload={
            user:{
                id:exit.id
            }
        }
        jwt.sign(payload,process.env.access_token_secreat,{expiresIn:360000},
            (err,token)=>{
                if(err) throw err;
                return res.json({token,msg:"Login Successfully"})
            })
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Errors")
    }

})

//particular user get in
router.get("/currentuser",middleware, async(req,res)=>{
    try{
        const user = await Registeruser.findById(req.user.id)
        if(!user){
            return res.status(400).send("user Not Available")
        }
       return res.json({user})
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Errors")
    }
})

module.exports = router;
