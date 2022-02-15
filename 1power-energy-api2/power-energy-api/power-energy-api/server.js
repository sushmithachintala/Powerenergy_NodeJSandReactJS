const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
var routes = require('./app/routes/routes');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();



app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
