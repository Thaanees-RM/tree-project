import express from 'express';
import "dotenv/config";
import cors from 'cors';
import axios from 'axios';

const app = express();
const SUBMISSION_SERVICE_URL = process.env.SUBMISSION_SERVICE_URL || 'http://submission-service:3012';

app.use(cors());
app.use(express.json());

/**
 * Certificate Service - Generates and manages certificates
 * 
 * Dependencies:
 * - Submission Service (get user data)
 * 
 * Endpoints:
 * POST /generate/:userId - Generate certificate for approved user
 * GET /certificate/:userId - Get certificate details
 */

app.post('/generate/:userId', async (req, res) => {
  try {
    // Get user data from Submission Service
    const users = await axios.get(`${SUBMISSION_SERVICE_URL}/users`);
    const user = users.data.find(u => u._id === req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.status !== 'Approved') {
      return res.status(400).json({ message: 'User must be approved first' });
    }

    // Generate certificate (mock)
    const certificate = {
      userId: req.params.userId,
      userName: `${user.firstName} ${user.lastName}`,
      tree: user.tree,
      issuedAt: new Date(),
      certificateUrl: `https://certificates.example.com/cert_${req.params.userId}.pdf`
    };

    res.status(201).json({ message: 'Certificate generated', data: certificate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/certificate/:userId', (req, res) => {
  res.status(200).json({ 
    message: 'Certificate retrieved',
    certificateUrl: `https://certificates.example.com/cert_${req.params.userId}.pdf`
  });
});

app.get('/', (req, res) => res.send("Certificate Service Running"));

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => console.log(`✅ Certificate Service running at http://localhost:${PORT}`));
