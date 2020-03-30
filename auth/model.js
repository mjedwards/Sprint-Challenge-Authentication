const db = require("../database/dbConfig");

module.exports = {
  login,
  register
};

function register(user) {
  return db("users").insert(user);
}

// function login(user) {
//   return db("users")
//     .where(user)
//     .select("username, password");
// }

function login(user) {
  return db("users")
    .where(user)
    .select("username", "password");
}
