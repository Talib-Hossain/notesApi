
const noteModel = require("../models/note");
const redisClient = require('../../redisClient');
const { colours } = require("nodemon/lib/config/defaults");

const createNotes = async (req, res) => {

    const { title, description } = req.body;

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });

    try {

        await newNote.save();
        await redisClient.del(`notes:${req.userId}`);
        res.status(201).json(newNote);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateNote = async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {

        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        await redisClient.del(`notes:${req.userId}`);
        res.status(200).json(newNote);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteNote = async (req, res) => {

    const id = req.params.id;
    try {

        const note = await noteModel.findByIdAndRemove(id);
        await redisClient.del(`notes:${req.userId}`);
        res.status(202).json(note);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}


const getNotes = async (req, res) => {
    try {
        const cacheKey = `notes:${req.userId}` 
        const notes = await noteModel.find({ userId: req.userId });
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(notes));
        res.status(200).json(notes)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

module.exports = {
    createNotes,
    updateNote,
    deleteNote,
    getNotes
}