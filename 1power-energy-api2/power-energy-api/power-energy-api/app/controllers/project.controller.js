const db = require("../models");
const Project = db.projects;
const Op = db.Sequelize.Op;

// Add a New Project
exports.addProject = (req, res) => {
  if (
    !req.body.name ||
    !req.body.carbon_emission ||
    !req.body.offset_value ||
    !req.body.created_by
  ) {
    res.status(400).send({
      message: "Please provide valid data",
    });
    return;
  }

  const project = {
    name: req.body.name,
    carbon_emission: req.body.carbon_emission,
    offset_value: req.body.offset_value,
    created_by: req.body.created_by,
  };

  Project.create(project)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, Please try again later.",
      });
    });
};

// Retrieve all Projects from the database.
exports.projects = (req, res) => {
  //user can pass optional query parameter as created_by to filter project by user.
  let created_by = req.query.created_by || null;
  let condition = created_by ? { created_by: created_by } : null;

  Project.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, Please try again later.",
      });
    });
};

// Get Project by Id
exports.getProjectById = (req, res) => {
  const id = req.params.projectId;
  Project.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Project with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred, Please try again later.",
      });
    });
};

// Update existing Project data
exports.updateProject = (req, res) => {
  Project.update(req.body, {
    where: { id: req.params.projectId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project has been updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Project with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred, Please try again later.",
      });
    });
};

// delete an existing project
exports.deleteProject = (req, res) => {
  Project.destroy({
    where: { id: req.params.projectId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Project with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred, Please try again later.",
      });
    });
};
