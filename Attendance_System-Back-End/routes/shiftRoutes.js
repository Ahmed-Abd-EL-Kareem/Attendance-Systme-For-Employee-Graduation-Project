const express = require("express");
const shiftController = require("../controllers/shiftController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect, authController.restrictTo("admin"));
router
  .route("/")
  .get(shiftController.getAllShifts)
  .post(shiftController.createShift);
router
  .route("/:id")
  .get(shiftController.getShift)
  .patch(shiftController.updateShift)
  .delete(shiftController.deleteShift);

module.exports = router;
