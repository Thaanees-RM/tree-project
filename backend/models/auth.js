import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    name: "admin",
    password: "admin123", 
  },
];

export const findUserByName = (name) => users.find((user) => user.name === name);
