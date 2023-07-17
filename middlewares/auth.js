const autheticatedStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "student") {
    return next();
  } else {
    res.redirect("/login");
  }
};

const autheticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  } else {
    res.redirect("/adminhhgg");
  }
};

module.exports = { autheticatedStudent, autheticatedAdmin };
