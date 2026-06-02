import express from "express";
import {
  createProject,
  getProject,
  getUserProjects,
  updateProject,
  deleteProject,
} from "../controllers/schemaController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getUserProjects);
router.get("/:shareId", getProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

export default router;