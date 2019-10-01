const express = require("express");
const dotenv = require("dotenv")
dotenv.config();

console.log(process.env.PORT);

const PORT = process.env.PORT || 1;

console.log(PORT);