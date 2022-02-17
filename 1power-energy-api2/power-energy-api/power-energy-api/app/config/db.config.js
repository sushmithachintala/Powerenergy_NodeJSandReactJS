const dbConfig = {
  HOST: '192.168.0.69',
  USER: 'sa',
  PASSWORD: 'Pa9052122936$',
  DB: 'Test_db',
  dialect: "mssql",
  port:2009,
  pool: {
    max: 15,
    min: 5,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = dbConfig