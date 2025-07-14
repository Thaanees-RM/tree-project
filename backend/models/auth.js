const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "admin",
    password: "$2a$10$4HGVN3z9r4URBvOGfXvT2uYV9dD0lOqDhUjcIX3iRScKJj7PKvRt6", // 'password123'
  },
];

const findUserByName = (name) => users.find((user) => user.name === name);

module.exports = { findUserByName };
