const { Student } = require("../models/Student");
const passport = require("passport");

const getRegisterStudent = (req, res, next) => {
  res.render("register", {
    titleText: "ثبت نام",
    path: "/register",
    message: [],
  });
};

const registerStudent = async (req, res, next) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      await Student.create({ ...req.body });
      req.flash("message", "با موفقیت ثبت نام کردید");
      return res.redirect("/login");
    }
    res.render("register", {
      titleText: "ثبت نام",
      path: "/register",
      err: ["شما قبلا ثبت نام کردید"],
      // message: [req.flash("message")],
    });
  } catch (err) {
    console.log(err);
    next(500);
  }
};

const getLoginStudent = (req, res, next) => {
  res.render("login", {
    titleText: "ورود دانش اموزان",
    path: "/login",
    err: [req.flash("error")],
    message: [req.flash("message")],
  });
};

const loginStudent = async (req, res, next) => {
  passport.authenticate("local", {
    failureFlash: true,
    badRequestMessage: "نام کاربری و گذروازه را وارد کنید",
    failureRedirect: "/login",
    successRedirect: "/stdash",
  })(req, res, next);
};
module.exports = {
  getRegisterStudent,
  registerStudent,
  getLoginStudent,
  loginStudent,
};
