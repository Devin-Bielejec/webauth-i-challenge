const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const insertUser = (user) => {
    return db("users")
    .insert(user)
}

const getAllUsers = () => {
    return db("users");
}

const checkLogin = (user) => {
    console.log(user.username);    
    return db("users")
    .where("username", user.username)
    .first()
    .select()
}

const findBy = (arg) => {
    return db("users")
    .where(arg)
}

module.exports = {
    insertUser,
    getAllUsers,
    checkLogin,
    findBy
}