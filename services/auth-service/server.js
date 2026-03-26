import express from 'express';
import "dotenv/config";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Auth Service - Handles admin authentication
 * 
 * Endpoints:
 * POST /login - Admin login
 * POST /verify - Verify JWT token
 */

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  if (name !== 'admin' || password !== 'admin123') {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Generate JWT
  const token = 'jwt_token_here';
  
  res.status(200).json({ message: 'Login successful', token });
});

app.post('/verify', (req, res) => {
  const { token } = req.body;
  
  // Verify token logic
  res.status(200).json({ valid: true });
});

app.get('/', (req, res) => res.send("Auth Service Running"));

const PORT = process.env.PORT || 3011;
app.listen(PORT, () => console.log(`✅ Auth Service running at http://localhost:${PORT}`));
