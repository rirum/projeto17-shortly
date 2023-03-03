import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import userRoutes from "./routes/userRoutes.js";


const server = express();
server.use(express.json());
server.use(cors());



server.use([authRoutes, urlRoutes, userRoutes]);
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})