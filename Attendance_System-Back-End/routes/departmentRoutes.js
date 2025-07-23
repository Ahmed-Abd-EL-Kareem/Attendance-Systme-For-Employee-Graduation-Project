const express = require("express");
const departmentController = require("../controllers/departmentController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect, authController.restrictTo("admin"));
router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(departmentController.createDepartment);
router
  .route("/:id")
  .get(departmentController.getDepartment)
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

module.exports = router;
