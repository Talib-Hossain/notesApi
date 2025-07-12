const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRoutes");
const noteRouter = require("./src/routes/noteRoutes");
const dotenv= require("dotenv");
const path = require("path")
const cors= require("cors");

dotenv.config({path: path.resolve(__dirname, "./.env")});

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/users", userRouter)
app.use("/note", noteRouter)

app.get("/", (req, res) => {
    res.send("Notes API!!");
})


const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port no. "+ PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    })


