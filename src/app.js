import express from "express";
import cors from "cors";


const server = express();
server.use(express.json());
server.use(cors());

//rotas em breve

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})