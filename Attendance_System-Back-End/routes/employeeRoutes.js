const express = require("express");
const employeeController = require("../controllers/employeeController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);
router.get(
  "/employee-counts-by-shift",
  authController.restrictTo("admin"),
  employeeController.getEmployeeCountsByShift
);
router.get(
  "/employee-counts-by-department",
  authController.restrictTo("admin"),
  employeeController.getEmployeeCountsByDepartment
);
// router.use(authController.protect);
router
  .route("/")
  .get(authController.restrictTo("admin"), employeeController.getAllEmployees)
  .post(authController.restrictTo("admin"), employeeController.createEmployee);
router
  .route("/:id")
  .get(employeeController.getEmployee)
  .patch(authController.restrictTo("admin"), employeeController.updateEmployee)
  .delete(
    authController.restrictTo("admin"),
    employeeController.deleteEmployee
  );

module.exports = router;
