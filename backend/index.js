import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import noteRoutes from "./routes/note.route.js";

dotenv.config();

const app = express();

//Middleware
const allowedOrigins = [
  'https://notes-keeper-sandy.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173'
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('MongoDB connected successfully');
    app.listen(3000 , () => {
        console.log("at Port 3000")
    })
})
.catch((error) => {
    console.log('MongoDB connection error', error);
})

export default app;
