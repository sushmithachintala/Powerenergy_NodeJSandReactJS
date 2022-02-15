module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
      name: {
        type: Sequelize.STRING
      },
      carbon_emission: {
        type: Sequelize.INTEGER
      },
      offset_value: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      }
    });
    return Project;
  };