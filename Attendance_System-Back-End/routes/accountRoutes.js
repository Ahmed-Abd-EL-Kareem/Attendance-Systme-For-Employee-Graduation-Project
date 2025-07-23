const express = require("express");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);
router.use(authController.protect);
router
  .route("/signup")
  .post(authController.restrictTo("admin"), authController.signup);
router
  .route("/updateEmployeePassword/:id")
  .patch(
    authController.restrictTo("admin"),
    authController.updateAccountPassword
  );
router
  .route("/updateMyPassword")
  .patch(authController.restrictTo("user"), authController.updatePassword);
router.route("/").get(accountController.getAllAccounts);
//   .post(accountController.createAccount);

router
  .route("/:id")
  .get(accountController.getAccount)
  // .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
