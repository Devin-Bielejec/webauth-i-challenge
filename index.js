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
server.post("/api/register", (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    Users.insertUser({username: username, password: hash})
    .then(response => {
        res.status(200).json({message: "User insertion successful!"})    
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    Users.checkLogin({username, password})
    .then(userRes => {
        console.log(userRes.password);
        if (userRes.length === 0) {
            res.status(404).json({message: "User does not exist"})
        }
        console.log("here");
        console.log(password, userRes.password);
        console.log(bcrypt.compareSync(password, userRes.password));
        bcrypt.compareSync(password, userRes.password) ? res.status(200).json({message: "Correct credentials!"}) : res.status(404).json({message: "Incorrect Credentials"})
        
    })
    .catch(error => {
        res.status(500).json({message: "Sever Error"});
    })
})

server.listen(PORT, () => console.log(`Server running on ${PORT}`))