
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: "Devin", password: "isSoCool"},
        {id: 2, username: "Seth", password: "isEvenCooler"},
        {id: 3, username: "Pumpkin", password: "Fairy123"}
      ]);
    });
};
