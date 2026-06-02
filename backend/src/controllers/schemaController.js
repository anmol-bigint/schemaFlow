import Project from "../models/schemaModel.js";
import crypto from "crypto";

export const createProject = async (req, res) => {
  const { title, dbml } = req.body;

  const shareId = crypto
    .randomBytes(8)
    .toString("hex");

  const project = await Project.create({
    owner: req.user.id,
    title,
    dbml,
    shareId,
  });

  res.status(201).json(project);
};

export const getProject = async (req, res) => {
  const project = await Project.findOne({
    shareId: req.params.shareId,
  });

  if (!project) {
    return res
      .status(404)
      .json({ message: "Not found" });
  }

  res.json(project);
};

export const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, dbml } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    project.title = title !== undefined ? title : project.title;
    project.dbml = dbml !== undefined ? dbml : project.dbml;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};