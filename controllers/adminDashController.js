const { Course } = require("../models/Course");
const { Statistoc, Statistic } = require("../models/Statistic");
const { Teacher } = require("../models/Teacher");
const { Event } = require("../models/Event");
const { ContactUsMsg } = require("../models/contactusmsg");
const { Blog } = require("../models/Blog");
const { miladiToShamsi } = require("../utils/jalali");
const { Student } = require("../models/Student");

const getAdminDash = async (req, res, next) => {
  try {
    let contactUsMsgs = await ContactUsMsg.find().sort([
      ["createdAt", "descending"],
    ]);
    let numberOfStudents = await Student.find().countDocuments();
    let numberOfBlogs = await Blog.find().countDocuments();
    let numberOfTeachers = await Teacher.find().countDocuments();
    let numberOfEvents = await Event.find().countDocuments();
    let events = await Event.find()
      .sort([["date", "ascending"]])
      .limit(4);
    let courses = await Course.find()
      .sort([["start", "ascending"]])
      .populate("teacher");
    let blogs = await Blog.find()
      .sort([["createdAt", "descending"]])
      .limit(4);
    res.render("admindash", {
      titleText: "داشبورد || مدیریت",
      path: "/dashboard",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      miladiToShamsi,
      contactUsMsgs,
      events,
      blogs,
      courses,
      numberOfBlogs,
      numberOfEvents,
      numberOfStudents,
      numberOfTeachers,
    });
  } catch (error) {}
};

const getEditStatistic = async (req, res, next) => {
  const stats = await Statistic.findOne();
  res.render("edit-statistic", {
    titleText: "داشبورد || ویرایش امار",
    path: "/dashboard/edit-statistic",
    user: req.user,
    layout: "./layouts/dashlayout.ejs",
    stats,
  });
};

const getAddTeacher = (req, res, next) => {
  res.render("add-teacher", {
    titleText: "داشبورد || معلم جدید",
    path: "/dashboard/add-teacher",
    layout: "./layouts/dashlayout.ejs",
    user: req.user,
  });
};

const getTeachers = async (req, res, next) => {
  let page = +req.query.page || 1;
  let teacherPerPage = 15;
  try {
    let numberOfTeachers = await Teacher.find().countDocuments();
    let teachers = await Teacher.find()
      .skip((page - 1) * teacherPerPage)
      .limit(teacherPerPage);
    teachers = teachers.reverse();
    res.render("teachers", {
      titleText: "داشبورد || حذف و ویرایش معلمان",
      path: "/dashboard/teachers",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      teachers,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: teacherPerPage * page < numberOfTeachers,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfTeachers / teacherPerPage),
    });
  } catch (err) {
    //todo error500
  }
};
const getEditTeacher = async (req, res, next) => {
  try {
    if (typeof req.query.teacherId !== "undefined") {
      let teacher = await Teacher.findById(req.query.teacherId);
      res.render("edit-teacher", {
        titleText: "داشبورد || ویرایش معلم",
        path: "/dashboard/edit-teacher",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        teacher,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.redirect("/dashboard/teachers");
  }
};

const getGallery = (req, res, next) => {
  res.render("gallery", {
    titleText: "داشبورد || گالری",
    path: "/dashboard/gallery",
    layout: "./layouts/dashlayout.ejs",
    user: req.user,
  });
};
const getAddCourse = async (req, res, next) => {
  let teachers = await Teacher.find();
  res.render("add-course", {
    titleText: "داشبورد || کلاس جدید",
    path: "/dashboard/add-course",
    layout: "./layouts/dashlayout.ejs",
    user: req.user,
    teachers,
  });
};

const getCourses = async (req, res, next) => {
  let page = +req.query.page || 1;
  let coursePerPage = 15;
  try {
    let numberOfCourses = await Course.find().countDocuments();
    let courses = await Course.find()
      .skip((page - 1) * coursePerPage)
      .limit(coursePerPage)
      .populate("teacher");
    let { miladiToShamsi } = require("../utils/jalali");
    courses = courses.reverse();
    res.render("courses", {
      titleText: "داشبورد || حذف و ویرایش کلاس ها",
      path: "/dashboard/courses",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      courses,
      miladiToShamsi,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: coursePerPage * page < numberOfCourses,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfCourses / coursePerPage),
    });
  } catch (err) {
    //todo error500
  }
};

const getEditCourse = async (req, res, next) => {
  try {
    if (typeof req.query !== "undefined") {
      let course = await Course.findById(req.query.courseId);
      let teachers = await Teacher.find();
      let { miladiToDigitShamsi } = require("../utils/jalali");

      res.render("edit-course", {
        titleText: "داشبورد || ویرایش کلاس",
        path: "/dashboard/edit-course",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        course,
        teachers,
        miladiToDigitShamsi,
      });
    } else {
      res.redirect("/dashboard/courses");
    }
  } catch (err) {
    console.log(err);
    //todo error500
  }
};

const getAddEvent = async (req, res, next) => {
  try {
    res.render("add-event", {
      titleText: "داشبورد || رویداد جدید",
      path: "/dashboard/add-event",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
    });
  } catch (err) {
    console.log(err);
    // todo error 500
  }
};
const getEvents = async (req, res, next) => {
  let page = +req.query.page || 1;
  let eventPerPage = 15;
  try {
    let numberOfEvents = await Event.find().countDocuments();
    let events = await Event.find()
      .sort([["createdAt", "ascending"]])
      .skip((page - 1) * eventPerPage)
      .limit(eventPerPage);
    let { miladiToShamsi } = require("../utils/jalali");
    res.render("events", {
      titleText: "داشبورد || رویداد ها",
      path: "/dashboard/events",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      events,
      miladiToShamsi,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: eventPerPage * page < numberOfEvents,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfEvents / eventPerPage),
    });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

const getEditEvent = async (req, res, next) => {
  try {
    if (typeof req.query !== "undefined") {
      let event = await Event.findById(req.query.eventId);
      let { miladiToDigitShamsi } = require("../utils/jalali");
      res.render("edit-event", {
        titleText: "داشبورد || ویرایش دوره",
        path: "/dashboard/edit-event",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        event,
        miladiToDigitShamsi,
      });
    } else {
      res.redirect("/dashboard/events");
    }
  } catch (err) {
    console.log(err);
    //todo error500
  }
};

const getAddBlog = (req, res, next) => {
  res.render("add-blog", {
    titleText: "داشبورد || بلاگ جدید",
    path: "/dashboard/add-blog",
    layout: "./layouts/dashlayout.ejs",
    user: req.user,
  });
};

const getBlogs = async (req, res, next) => {
  let page = +req.query.page || 1;
  let blogPerPage = 15;
  try {
    let numberOfBlogs = await Blog.find().countDocuments();
    let blogs = await Blog.find()
      .sort([["createdAt", "ascending"]])
      .skip((page - 1) * blogPerPage)
      .limit(blogPerPage)
      .populate("createdBy");
    let { miladiToShamsi } = require("../utils/jalali");
    res.render("blogs", {
      titleText: "داشبورد || پست ها",
      path: "/dashboard/blogs",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      blogs,
      miladiToShamsi,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: blogPerPage * page < numberOfBlogs,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfBlogs / blogPerPage),
    });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

const getEditBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.query.blogId);
    res.render("edit-blog", {
      titleText: "داشبورد || ویرایش بلاگ",
      path: "/dashboard/edit-blog",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      blog,
    });
  } catch (error) {}
};
module.exports = {
  getAdminDash,
  getEditStatistic,
  getAddTeacher,
  getTeachers,
  getEditTeacher,
  getGallery,
  getAddCourse,
  getCourses,
  getEditCourse,
  getAddEvent,
  getEvents,
  getEditEvent,
  getAddBlog,
  getBlogs,
  getEditBlog,
};
