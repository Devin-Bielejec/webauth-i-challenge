
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
        tbl.increments("id").notNull().unsigned()
        tbl.string("username").notNull()
        tbl.string("password").notNull()    
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
