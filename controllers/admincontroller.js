//#External modules
const passport = require("passport");
const sharp = require("sharp");
const shortId = require("shortid");
const appRoot = require("app-root-dir").get();

//#Internal modules and Models
const path = require("path");
const { Statistic } = require("../models/Statistic");
const { Teacher } = require("../models/Teacher");
const { Gallery } = require("../models/Gallery");
const { Course } = require("../models/Course");
const { Applicant } = require("../models/Applicant");
const { Event } = require("../models/Event");
const { Blog } = require("../models/Blog");
const moment = require("../utils/jalali");
const fs = require("fs");

// @Desc render admin login page
const getAdminLogin = (req, res, next) => {
  res.render("adminlogin", {
    titleText: "ورود مدیریت",
    path: "/adminlogin",
    err: [req.flash("error")],
    message: [req.flash("message")],
  });
};

// @Desc Handle admin login with "passport" module
const adminLogin = async (req, res, next) => {
  passport.authenticate("admin-local", {
    failureFlash: true,
    badRequestMessage: "نام کاربری و گذروازه را وارد کنید",
    failureRedirect: "/adminhhgg",
    // successRedirect: "/dashboard",
  })(req, res, next);
};

//@Desc set sessionId expire time if the admin tick checkbox
const rememberMe = (req, res, next) => {
  if (req.body.rememberme) {
    req.session.cookie.originalMaxAge = 60000 * 60 * 24; //24 hour
  } else {
    req.session.cookie.originalMaxAge = 60000 * 60; //60 minute
  }
  res.redirect("/dashboard");
};

//@Desc logout admin he can't get access to dashboard anymore
const logout = (req, res, next) => {
  req.session.cookie.originalMaxAge = null;
  req.logout();
  res.redirect("/adminhhgg");
};

//@Desc edit statistics of main page with json *Statistics are unique in database we wouldn't create new one
const editStatistic = async (req, res, next) => {
  try {
    let jsonVari = {};
    let { key } = req.body;
    jsonVari[key] = req.body.value;
    await Statistic.updateOne({}, jsonVari);
    res.status(200).send({ message: "ویرایش شد" });
  } catch (error) {}
};

//*Teacher oeprations Section
// @Desc add new teacher to database afterthat all authentication is done
//1- store picture - with resizing
//2- create new record of teacher in database
//3- redirect to dashboard main page
const addTeacher = async (req, res, next) => {
  try {
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "teachers",
      imageName
    );
    await sharp(req.files.image.data)
      .jpeg()
      .resize(270, 270)
      .withMetadata()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Teacher.create({ ...req.body, image: imageName });
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(`erro : ${err}`);
    //todo error 500
  }
};

//@Desc edit teacher information on database
//1- get teacher by id and delete previous image of teacher from storage
//2- store new picture of teacher
//3- update teacher infromation in database
//4- redirect to teachers list page
const editTeacher = async (req, res, next) => {
  try {
    let teacher = await Teacher.findById(req.query.teacherId);
    fs.unlinkSync(
      path.join(
        appRoot,
        "public",
        "assets",
        "images",
        "teachers",
        teacher.image
      )
    );
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "teachers",
      imageName
    );
    await sharp(req.files.image.data)
      .jpeg()
      .resize(270, 270)
      .withMetadata()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Teacher.findByIdAndUpdate(req.query.teacherId, {
      ...req.body,
      image: imageName,
    });
    return res.redirect("/dashboard/teachers");
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

//@Desc get teacher ID with ajax
//1- delete teacher image from storage
//2- find record from database and remove it
//3- send response code
const deleteTeacher = async (req, res, next) => {
  console.log(req.body.id);
  try {
    let teacher = await Teacher.findById(req.body.id);
    fs.unlinkSync(
      path.join(
        appRoot,
        "public",
        "assets",
        "images",
        "teachers",
        teacher.image
      )
    );
    await Teacher.deleteOne(teacher);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

//*end teacher operations Section

//@Desc get image from ajax request and it then just send response code
const galleryUploader = async (req, res, next) => {
  try {
    let imageName = `${shortId.generate()}_${req.files.file.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "gallery",
      imageName
    );
    await sharp(req.files.file.data)
      .jpeg()
      .resize(500, 500, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Gallery.create({ image: imageName, createdBy: req.user.id });
    res.status(200).json({ message: "uploaded" });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

//*start Course operations Section
const addCourse = async (req, res, next) => {
  try {
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "courses",
      imageName
    );
    await sharp(req.files.image.data)
      .jpeg()
      .resize(2000, 1333, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });

    await Course.create({
      ...req.body,
      start: moment.shamsiToMiladi(req.body.start),
      end: moment.shamsiToMiladi(req.body.end),
      image: imageName,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};
//@Desc get course ID with ajax
//1- delete course image from storage
//2- find record from database and remove it
//3- send response code
const deleteCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.body.id);
    fs.unlinkSync(
      path.join(appRoot, "public", "assets", "images", "courses", course.image)
    );
    await Course.findByIdAndRemove(req.body.id);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

//@Desc edit course information on database
//1- get course by id and delete previous image of course from storage
//2- store new picture of course
//3- update course infromation in database
//4- redirect to courses list page
const editCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.query.courseId);
    fs.unlinkSync(
      path.join(appRoot, "public", "assets", "images", "courses", course.image)
    );
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "courses",
      imageName
    );
    await sharp(req.files.image.data)
      .jpeg()
      .resize(2000, 1333, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Course.findByIdAndUpdate(req.query.courseId, {
      ...req.body,
      start: moment.shamsiToMiladi(req.body.start),
      end: moment.shamsiToMiladi(req.body.end),
      image: imageName,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};
//*end Course operations Section

//*start event operations Section
const addEvent = async (req, res, netx) => {
  try {
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "events",
      imageName
    );
    await sharp(req.files.image.data)
      .resize(749, 500, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .jpeg()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Event.create({
      ...req.body,
      image: imageName,
      date: moment.shamsiToMiladi(req.body.date),
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    // todo error 500
    // }
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.body.id);
    fs.unlinkSync(
      path.join(appRoot, "public", "assets", "images", "events", event.image)
    );
    await Event.deleteOne(event);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};
//@Desc edit event information on database
//1- get event by id and delete previous image of event from storage
//2- store new picture of event
//3- update event infromation in database
//4- redirect to events list page
const editEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.query.eventId);
    fs.unlinkSync(
      path.join(appRoot, "public", "assets", "images", "events", event.image)
    );
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "events",
      imageName
    );
    await sharp(req.files.image.data)
      .jpeg()
      .resize(749, 500, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Event.findByIdAndUpdate(req.query.eventId, {
      ...req.body,
      date: moment.shamsiToMiladi(req.body.date),
      image: imageName,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};
//*end event operations Section

//*start blog operations Section
const addBlog = async (req, res, next) => {
  try {
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "blogs",
      imageName
    );
    await sharp(req.files.image.data)
      .resize(749, 500, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .jpeg()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Blog.create({
      ...req.body,
      image: imageName,
      createdBy: req.user.id,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    // todo error 500
    // }
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.body.id);
    fs.unlinkSync(
      path.join(appRoot, "public", "assets", "images", "blogs", blog.image)
    );
    await Blog.deleteOne(blog);
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

const editBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.query.blogId);
    fs.unlinkSync(
      path.join(appRoot, "public", "assets", "images", "blogs", blog.image)
    );
    let imageName = `${shortId.generate()}_${req.files.image.name}`;
    let storagePath = path.join(
      appRoot,
      "public",
      "assets",
      "images",
      "blogs",
      imageName
    );
    await sharp(req.files.image.data)
      .resize(749, 500, { fit: sharp.fit.contain, withoutEnlargement: false })
      .withMetadata()
      .jpeg()
      .toFile(storagePath)
      .catch((err) => {
        console.log(err);
        //todo error 500
      });
    await Blog.findByIdAndUpdate(req.query.blogId, {
      ...req.body,
      image: imageName,
    });
    res.redirect("/dashboard/blogs");
  } catch (err) {
    console.log(err);
    // todo error 500
    // }
  }
};
//*end blog operations Section

module.exports = {
  getAdminLogin,
  adminLogin,
  rememberMe,
  logout,
  editStatistic,
  addTeacher,
  editTeacher,
  galleryUploader,
  addCourse,
  deleteCourse,
  deleteTeacher,
  editCourse,
  addEvent,
  deleteEvent,
  editEvent,
  addBlog,
  deleteBlog,
  editBlog,
};
