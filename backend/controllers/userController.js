import cloudinary from "../configs/cloudinary.js";
import streamifier from "streamifier";
import User from '../models/user.js';
// import fs from 'fs/promises'; // for reading certificate file
// import path from 'path';
// import { fileURLToPath } from 'url';
// import sendCertificateEmail from '../utils/sendCertificateEmail.js';
import { generateNamedCertificate } from '../utils/certificateGenerator.js';

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

    let imagePath = "";

    // If file is uploaded, send it to Cloudinary
    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "tree-uploads"
            },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imagePath = result.secure_url;
    }

  

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



 //PUT /api/submissions/:id/approve → approve a submission
 export const approveSubmission = async (req, res) => {
   try {
     const { id } = req.params;
     const updated = await User.findByIdAndUpdate(
       id,
       { status: "Approved" },
       { new: true }
     );
     if (!updated) return res.status(404).json({ error: "Submission not found" });

    //const fullName = `${updated.firstName} ${updated.lastName}`;
    //const pdfBuffer = await generateNamedCertificate(fullName);

    //const pdfBuffer = await generateNamedCertificate(updated.firstName);
    //await sendCertificateEmail(updated.email, pdfBuffer);

    const fullName = `${updated.firstName} ${updated.lastName}`;
    const certFileName = await generateNamedCertificate(fullName, updated._id);

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

// PUT /api/submissions/:id/pending → pending a submission
export const markPending = async (req, res) => {
  try {
    const submission = await User.findByIdAndUpdate(
      req.params.id,
      { status: "Pending" },
      { new: true }
    );
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark submission as pending" });
  }
};
