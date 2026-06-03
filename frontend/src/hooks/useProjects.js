import { useState, useEffect } from "react";
import parseSchema from "@/utils/parseSchema";
import {
  getAllSchemas,
  createSchema,
  updateSchema,
  deleteSchema,
} from "@/services/schemaService";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState("");
  const [schema, setSchema] = useState("");
  const [compiled, setCompiled] = useState({ nodes: [], edges: [] });

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const fetchProjects = async () => {
    if (!token) return;
    try {
      const response = await getAllSchemas(token);
      setProjects(response.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProjects();
  }, [isLoggedIn]);

  const handleSelectProject = (proj) => {
    setProject(proj);
    setTitle(proj.title || "");
    setSchema(proj.dbml || "");
    try {
      const { tempNodes, tempEdges } = parseSchema(proj.dbml || "");
      setCompiled({ nodes: tempNodes, edges: tempEdges });
    } catch (err) {
      console.error("Parse error on project load:", err);
    }
  };

  const handleNewProject = () => {
    setProject(null);
    setTitle("");
    setSchema("");
    setCompiled({ nodes: [], edges: [] });
  };

  const handleCompile = () => {
    try {
      const { tempNodes, tempEdges } = parseSchema(schema);
      setCompiled({ nodes: tempNodes, edges: tempEdges });
    } catch (err) {
      console.error("Compile error:", err);
    }
  };

  const handleSaveProject = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }
    if (!token) {
      alert("Please login first");
      return;
    }
    try {
      const payload = { title, dbml: schema };
      let response;
      if (project?._id) {
        response = await updateSchema(token, project._id, payload);
        alert("Project updated successfully!");
      } else {
        response = await createSchema(token, payload);
        alert("Project saved successfully!");
      }
      setProject(response.data);
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save project");
    }
  };

  const handleDeleteProject = async (projectId, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this schema?")) return;
    try {
      await deleteSchema(token, projectId);
      alert("Project deleted successfully");
      if (project?._id === projectId) handleNewProject();
      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const handleCopyShareLink = async () => {
    if (!project?.shareId) {
      alert("Please save the project first");
      return;
    }
    try {
      const shareUrl = `${window.location.origin}/share/${project.shareId}`;
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied!");
    } catch (err) {
      console.error(err);
      alert("Failed to copy link");
    }
  };

  return {
    projects,
    project,
    title,
    setTitle,
    schema,
    setSchema,
    compiled,
    isLoggedIn,
    handleSelectProject,
    handleNewProject,
    handleCompile,
    handleSaveProject,
    handleDeleteProject,
    handleCopyShareLink,
  };
}
