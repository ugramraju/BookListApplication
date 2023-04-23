const mongoose = require("mongoose");
let BooksModel = new mongoose.Schema({
    title_of_the_book:{
        type:String,
        required:true,
    },
    isbn:{
        type:String,
        required:true,
        
    },
    author:{
        type:String,
        required:true,  
    },
    describe_this_book:{
        type:String,
        required:true,  
    },
    published_date:{
        type:Date,
        required:true,  
    },
    publisher_of_this_book:{
        type:String,
        required:true,  
    }
})
module.exports = mongoose.model("books",BooksModel)