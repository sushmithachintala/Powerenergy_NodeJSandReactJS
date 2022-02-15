const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const projectRoutes = require("./project.routes");




// fallback route.
router.get("/", function (req, res) {
  res.send("Please select proper route");
});

router.use("/api", userRoutes);
router.use("/api", projectRoutes);



module.exports = router;
