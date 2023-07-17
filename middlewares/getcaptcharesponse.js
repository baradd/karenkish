const fetch = require("node-fetch");
const getCaptchaResponse = async (req, res, next) => {
  const token = req.body["g-recaptcha-response"];
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET}&response=${token}&remoteip=${req.connection.remoteAddress}`;
  const response = await fetch(verifyUrl);
  const captchaStatus = await response.json();
  console.log(captchaStatus);
  if (captchaStatus.success) {
    return next();
  } else {
    req.flash("error", "اعتبار سنجی کپچا نا معتبر");
    return res.redirect("/adminhhgg");
  }
};

module.exports = { getCaptchaResponse };
