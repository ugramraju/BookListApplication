const express = require("express");
const booksSchema = require("../Models/booksSchema");
// const { Schema } = require("mongoose");
const router = express.Router();
router.use(express.json());

// books post
router.post("/bookspost",(req,res)=>{
    const book = booksSchema.create(req.body)
    .then((data)=>{
        res.status(201).send({data})
    })
    .catch((err)=>{
        res.status(400).send(err)
    });
});

//books get
router.get("/booksget",(req,res)=>{
    booksSchema.find()
    .then((data)=>{
        res.status(201).send({data})
    })
    .catch((err)=>{
        res.status(400).send(err)
    });
})

// books delete
router.delete("/bookdelete/:id",async(req,res)=>{
    try{
        const data = await booksSchema.findByIdAndDelete(req.params.id);
        res.json(data)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//books Edit
router.put("/booksEdit/:id",async(req,res)=>{
    try{
        const data = await booksSchema.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.json(data)
    }
    catch(err){
        res.status(400).send(err)
    }
})
module.exports = router;