const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);



const insertUser = (user) => {
    console.log(user);
    return db("users")
    .insert(user)
}

const getAllUsers = () => {
    return db("users");
}

module.exports = {
    insertUser,
    getAllUsers
}