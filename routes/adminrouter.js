const router = require("express").Router();
const adminController = require("../controllers/admincontroller");
const adminDashController = require("../controllers/adminDashController");
const { getCaptchaResponse } = require("../middlewares/getcaptcharesponse");
const auth = require("../middlewares/auth");

router.get("/adminhhgg", adminController.getAdminLogin);

router.post(
  "/adminghhgg",
  getCaptchaResponse,
  adminController.adminLogin,
  adminController.rememberMe
);

module.exports = { router };
