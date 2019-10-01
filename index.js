const express = require("express");
const dotenv = require("dotenv")
dotenv.config();

const server = express();

const PORT = process.env.PORT || 1;

//api calls

server.listen(PORT, () => console.log(`Server running on ${PORT}`))