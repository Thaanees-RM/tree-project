import express from 'express';
import "dotenv/config";
import cors from 'cors';
import axios from 'axios';

const app = express();
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:3011';

app.use(cors());
app.use(express.json());

/**
 * Submission Service - Handles user tree planting submissions
 * 
 * Dependencies:
 * - Auth Service (verify token before processing)
 * 
 * Endpoints:
 * POST /users - Create new submission
 * GET /users - Get all submissions
 * PUT /users/:id/:action - Update submission status (approve/reject/pending)
 */

const mockSubmissions = [];

// Middleware: Verify token with Auth Service
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    await axios.post(`${AUTH_SERVICE_URL}/verify`, { token });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email, tree, location } = req.body;
    
    const submission = {
      _id: Date.now().toString(),
      firstName,
      lastName,
      email,
      tree,
      location,
      status: 'Pending',
      createdAt: new Date()
    };
    
    mockSubmissions.push(submission);
    res.status(201).json({ message: 'Submission created', data: submission });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users', (req, res) => {
  res.status(200).json(mockSubmissions);
});

app.put('/users/:id/:action', verifyToken, (req, res) => {
  const { id, action } = req.params;
  
  const submission = mockSubmissions.find(s => s._id === id);
  if (!submission) {
    return res.status(404).json({ message: 'Submission not found' });
  }

  if (action === 'approve') submission.status = 'Approved';
  else if (action === 'reject') submission.status = 'Rejected';
  else submission.status = 'Pending';

  res.status(200).json({ message: `Submission ${action}ed`, data: submission });
});

app.get('/', (req, res) => res.send("Submission Service Running"));

const PORT = process.env.PORT || 3012;
app.listen(PORT, () => console.log(`✅ Submission Service running at http://localhost:${PORT}`));
