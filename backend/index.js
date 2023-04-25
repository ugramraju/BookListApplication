const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors")
const userRoutes = require("./Routes/userRoutes");
const booksRoutes = require("./Routes/booksRoutes")
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.port || 8000;

app.listen((port),()=>{
    console.log(`app listen on ${port}`)
})
app.use("/api/user",userRoutes);
app.use("/api",booksRoutes)
mongoose.connect(process.env.mongoose_connection,{
   useUnifiedTopology:true,
   useNewUrlParser:true


}).then(()=>console.log("DataBase Connected SuccessFully"))
