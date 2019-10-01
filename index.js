const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Users = require("./db");

dotenv.config();

const server = express();
server.use(express.json());
const PORT = process.env.PORT || 1;

//middleware


//api calls
server.post("/users", (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    Users.insertUser({username: username, password: hash})
    .then(res => {
        console.log('chicken');
        res.status(200).json({message: "User was insertion successful!"})    
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`))