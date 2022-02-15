const express = require("express");
const router = express.Router();
const project = require("../controllers/project.controller");



// Add New Project
router.post("/addProject", project.addProject);

// Fetch All Projects.
router.get("/projects", project.projects);

// Fetch Project By Id.
router.get("/project/:projectId", project.getProjectById);

// Update Project.
router.put("/updateProject/:projectId", project.updateProject);

// Delete Project.
router.delete("/deleteProject/:projectId", project.deleteProject);

module.exports = router;
