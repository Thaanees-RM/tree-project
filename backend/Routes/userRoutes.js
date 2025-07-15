import express from "express";
import upload from "../middleware/upload.js";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionsByStatus,
  approveSubmission,
  rejectSubmission,
  getSubmissionById,
  markPending
} from "../controllers/userController.js";

const router = express.Router(); 

// Form submission with image
router.post("/", upload.single("image"), createSubmission);

// All submissions
router.get("/", getAllSubmissions);

// Filtered by status
router.get("/status/:status", getSubmissionsByStatus);

// Approve or Reject
router.put("/:id/approve", approveSubmission);
router.put("/:id/reject", rejectSubmission);
router.put("/:id/pending", markPending);

// Optional: Get one
router.get("/:id", getSubmissionById);

export default router;
