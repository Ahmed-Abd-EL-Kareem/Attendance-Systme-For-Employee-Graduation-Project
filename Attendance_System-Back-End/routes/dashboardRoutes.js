const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();

router.route("/").get(dashboardController.dashboard);

module.exports = router;
