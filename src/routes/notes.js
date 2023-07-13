const notesControllers=require("../controllers/notes")
const verifyToken=require("../middleware/verifyToken")
const express =require('express')
const router=express.Router() 
router.post("/notes",verifyToken,notesControllers.createNote)
router.get("/notes", verifyToken, notesControllers.getNotes);
router.patch("/notes/:noteId", verifyToken, notesControllers.updateNote);
router.post("/notes/:noteId", verifyToken, notesControllers.deleteNote);
