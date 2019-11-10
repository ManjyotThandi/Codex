const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");
const pageRoutes = require("./page");

router.use("/", pageRoutes);
router.use("/api", apiRoutes);

module.exports = router;
