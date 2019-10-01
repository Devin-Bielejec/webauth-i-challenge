const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

module.exports = {
    insertUser,
    getAllUsers
}

const insertUser = (username, password) => {
    return db("users")
    .insert({ username: username, password: password})
}

const getAllUsers = () => {
    return db("users");
}