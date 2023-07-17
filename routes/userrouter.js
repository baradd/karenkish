const router = require("express").Router();

const userController = require("../controllers/usercontroller");
const validators = require("../middlewares/validators");

//@Desc Get register page for students
router.get("/register", userController.getRegisterStudent);

// @Desc Get data form post method to register student
router.post(
  "/register",
  validators.registerStudentValidator,
  userController.registerStudent
);

//@Desc get login page for students
router.get("/login", userController.getLoginStudent);
router.post("/login", userController.loginStudent);

router.get("/stdash", (req, res, next) => {
  res.send(req.user);
});
module.exports = { router };
