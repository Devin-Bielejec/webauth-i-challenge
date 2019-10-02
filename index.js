const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Users = require("./db");
const session = require("express-session");

dotenv.config();

const server = express();
server.use(express.json());
const PORT = process.env.PORT || 1;

const sessionConfig = {
    name: "Devin",
    secret: "isSoCool",
    cookie: {
        maxAge: 1000 * 30,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false
}

server.use(session(sessionConfig));

//middleware
const protected = (req, res, next) => {
    console.log("the session is",req.session);
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({message: "You shall not pass!"})
    }
}


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
        if (userRes.length === 0) {
            res.status(404).json({message: "User does not exist"})
        }
        req.session.user = username;
        console.log(req.session.user);
        console.log(req.session);
        bcrypt.compareSync(password, userRes.password) ? res.status(200).json({message: "Correct credentials! Logged in!"}) : res.status(404).json({message: "Incorrect Credentials"})
        
    })
    .catch(error => {
        res.status(500).json({message: "Sever Error"});
    })
})

//Get users
server.get('/api/users', protected, (req, res) => {
    Users.getAllUsers()
      .then(users => res.json(users))
      .catch(err => res.json(err));
  });




server.listen(PORT, () => console.log(`Server running on ${PORT}`))