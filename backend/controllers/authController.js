// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { findUserByName } from "../models/auth.js";

// export const login = async (req, res) => {
//   const { name, password } = req.body;

//   if (!name || !password) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   const user = findUserByName(name);
//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials." });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid credentials." });
//   }

//   const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.status(200).json({ message: "Login successful", token });
// };

import jwt from "jsonwebtoken";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // Ideally hashed but plain here for simplicity

export const login = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (name !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = jwt.sign(
    { username: ADMIN_USERNAME, role: "admin" },
    process.env.JWT_SECRET || "your_jwt_secret_key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ message: "Login successful", token });
};
