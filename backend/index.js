import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.log('MongoDB connection error', error);
})

export default app;
