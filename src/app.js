import express from "express";

const server = express();
const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})