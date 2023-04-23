const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader = req.header.Authorization || req.header.authorization;
    if(authHeader){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.access_token_secreat,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user Is Authorized")
            }
            req.user = decoded.user;
            next();
        })
        if(!token){
            res.status(401)
            throw new Error("user Is not Authorized")
        }
    }
})
module.exports = validateToken;