import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";


const server = express();
server.use(express.json());
server.use(cors());

//rotas em breve

server.use([authRoutes]);
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})