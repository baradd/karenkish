const errorHandler = (errCode, req, res, next) => {
  if (errCode === 500) {
    return res.render("500", {
      titleText: "خطای سرور",
      path: "/500",
      message: null,
      err: [],
    });
  }
};
const get404 = (req, res, next) => {
  res.render("404", {
    titleText: "پیدا نشد",
    path: "404",
    err: [],
    message: null,
  });
};
module.exports = { errorHandler, get404 };
