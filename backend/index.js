import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(cors());
app.use(express.json());

app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log('MongoDB connection error', error);
})
