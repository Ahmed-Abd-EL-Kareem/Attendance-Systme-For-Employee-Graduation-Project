const express = require("express");
const reportController = require("../controllers/reportController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);
router
  .route("/")
  .get(authController.restrictTo("admin"), reportController.getAllReports)
  .post(authController.restrictTo("user"), reportController.createReport);
router
  .route("/:id")
  .get(reportController.getReport)
  .patch(reportController.updateReport)
  .delete(reportController.deleteReport);

module.exports = router;
