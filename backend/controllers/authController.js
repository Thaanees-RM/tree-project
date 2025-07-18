
import jwt from "jsonwebtoken";

// Hardcoded credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123"; // You can hash this if needed

export const login = (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Match credentials
  if (name !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username: ADMIN_USERNAME, role: "admin" },
   // process.env.JWT_SECRET || "default_jwt_secret",
    "supersecureadminkey123",
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "Login successful", token });
};

