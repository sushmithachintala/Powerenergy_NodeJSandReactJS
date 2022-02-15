const dbConfig = {
  HOST: '',
  USER: '',
  PASSWORD: '',
  DB: '',
  dialect: "mssql",
  port:7008,
  pool: {
    max: 15,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbConfig