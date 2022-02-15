const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Register a new user
exports.registerUser = (req, res) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "Please send all the mandatory information to register user",
    });
    return;
  }

  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred, Please try again later.",
      });
    });
};

// Fetch all Users from the DB.
exports.users = (req, res) => {
  User.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Authenticate an User
exports.authenticateUser = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
      where: {
        username,
        password,
      },
    })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Please provide valid username & password`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Occured while authenticating an user",
      });
    });
};
