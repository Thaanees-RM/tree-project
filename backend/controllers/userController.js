import User from '../models/user.js';

// POST /api/submissions → create a new submission
export const createSubmission = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      tree,
      location,
      acceptedTerms,
      subscribe
    } = req.body;

    const imagePath = req.file?.path;

    const submission = new User({
      firstName,
      lastName,
      email,
      tree,
      location,
      acceptedTerms: acceptedTerms === 'true' || acceptedTerms === true,
      subscribe: subscribe === 'true' || subscribe === true,
      imagePath
    });

    await submission.save();

    res.status(201).json({
      message: "Submission successful",
      data: submission
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ error: "Failed to create submission" });
  }
};

// GET /api/submissions → get all submissions
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await User.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};

// GET /api/submissions/status/:status → get submissions by status
export const getSubmissionsByStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const submissions = await User.find({ status }).sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error filtering submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions by status" });
  }
};

// PUT /api/submissions/:id/approve → approve a submission
export const approveSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Submission not found" });
    res.status(200).json({ message: "Submission approved", data: updated });
  } catch (error) {
    console.error("Error approving submission:", error);
    res.status(500).json({ error: "Failed to approve submission" });
  }
};

// PUT /api/submissions/:id/reject → reject a submission
export const rejectSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Submission not found" });
    res.status(200).json({ message: "Submission rejected", data: updated });
  } catch (error) {
    console.error("Error rejecting submission:", error);
    res.status(500).json({ error: "Failed to reject submission" });
  }
};

// GET /api/submissions/:id → get single submission
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await User.findById(id);
    if (!submission) return res.status(404).json({ error: "Submission not found" });
    res.status(200).json(submission);
  } catch (error) {
    console.error("Error getting submission:", error);
    res.status(500).json({ error: "Failed to get submission" });
  }
};
