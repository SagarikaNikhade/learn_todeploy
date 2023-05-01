const express = require("express");
const {connection} = require("./config/db");
const {UserRouter} = require("./routes/User.route")
const app = express();
const jwt = require("jsonwebtoken");
const {auth} = require("./middleware/auth.middleware")
const {notesRouter} = require("./routes/Notes.route")
const cors = require("cors");
require('dotenv').config()

app.use(express.json())
app.use(cors())

app.use("/user",UserRouter)

app.use(auth)
app.use("/notes",notesRouter)

app.get("/movies",(req,res)=>{
  res.status(200).send("Movies Data")
})

app.listen(process.env.port,async()=>{
    try{
      await connection;
      console.log("connected to DB!!")
    }catch(err){
        console.log(err)
        console.log("cannot connected to DB!!")
    }
    console.log(`server running at ${process.env.port}`);
})