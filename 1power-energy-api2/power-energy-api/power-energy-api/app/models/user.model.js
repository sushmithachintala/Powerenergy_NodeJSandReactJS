module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
    return User;
  };