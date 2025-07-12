const express = require("express");
const { getNotes, createNotes, deleteNote, updateNote } = require("../controllers/noteController");
const auth = require("../middlewares/auth");
const noteRouter = express.Router();
const { cacheNotes } = require('../middlewares/cache');

noteRouter.get("/",auth, cacheNotes, getNotes);

noteRouter.post("/",auth, createNotes);

noteRouter.delete("/:id",auth, deleteNote);

noteRouter.put("/:id",auth, updateNote);

module.exports = noteRouter;