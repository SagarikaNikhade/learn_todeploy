const express = require("express")
const {NoteModel} = require("../models/Notes.model");
const notesRouter = express.Router()
//for all the following things authentication is required.

notesRouter.post("/create", async (req,res)=>{
try{
const note=new NoteModel(req.body)
await note.save()
res.status(200).send({"msg":"Note Created"})
}catch(err){
    res.status(400).send({"msg":err.message})
}
})

notesRouter.get("/", async(req,res)=>{
   try{
    const note = await NoteModel.find({authorID:req.body.authorID});
    res.send(note)
   }catch(err){
    res.status(400).send({"msg":err.message})
   }
})


notesRouter.patch("/update/:noteID", async(req,res)=>{
const {noteID} = req.params
const note=new NoteModel.findOne({_id:noteID})
try{
    if(req.body.authorID !== note.authorID){
        res.status(200).send({"msg":"Your not authorize to do it!!"})
    }else{
  await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
   res.status(200).send("notes updated!!")
    }
}catch(err){
    res.status(400).send({"msg":err.message}) 
}
})

notesRouter.delete("/delete/:noteID", async(req,res)=>{
    const {noteID} = req.params
    const note=new NoteModel.findOne({_id:noteID})
    try{
    if(req.body.authorID !== note.authorID){
        res.status(200).send({"msg":"Your not authorize to do it!!"}) 
    }else{
      await NoteModel.findByIdAndDelete({_id:noteID})
       res.send("notes Deleted!!")
    }
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

module.exports={notesRouter}
