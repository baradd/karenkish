const { Teacher } = require("../models/Teacher");
const { Course } = require("../models/Course");
const { Gallery } = require("../models/Gallery");
const { Event } = require("../models/Event");
const { truncateTo200 } = require("../utils/truncate");
const { miladiToShamsi } = require("../utils/jalali");
const { Blog } = require("../models/Blog");
const { Statistic } = require("../models/Statistic");
const { Applicant } = require("../models/Applicant");
const { ContactUsMsg } = require("../models/contactusmsg");

const getMainpage = async (req, res, next) => {
  try {
    let statistics = await Statistic.findOne();
    let courses = await Course.find()
      .sort([["createdAt", "descending"]])
      .limit(3);
      console.log(courses);
    let events = await Event.find()
      .sort([["createdAt", "descending"]])
      .limit(2);
    let blogs = await Blog.find({ status: "public" })
      .sort([["createdAt", "descending"]])
      .limit(3);
    let teachers = await Teacher.find()
      .sort([["descending"]])
      .limit(4);
    res.render("index", {
      titleText: "موسسه اموزشی کارن",
      path: "/",
      miladiToShamsi,
      truncateTo200,
      courses,
      statistics,
      events,
      blogs,
      teachers,
    });
  } catch (err) {
    console.log(err);
    //todo error 500
  }
};

const getTeachersU = async (req, res, next) => {
  let page = +req.query.page || 1;
  let teacherPerPage = 12;
  try {
    let numberOfTeachers = await Teacher.find().countDocuments();
    let teachers = await Teacher.find()
      .skip((page - 1) * teacherPerPage)
      .limit(teacherPerPage);

    teachers = teachers.reverse();
    res.render("teachersU", {
      titleText: "موسسه اموزشی کارن",
      path: "/teachers",
      teachers,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: teacherPerPage * page < numberOfTeachers,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfTeachers / teacherPerPage),
    });
  } catch (error) {}
};

const getCoursesU = async (req, res, next) => {
  let page = +req.query.page || 1;
  let coursePerPage = 6;
  try {
    let numberOfCourses = await Course.find().countDocuments();
    let courses = await Course.find()
      .skip((page - 1) * coursePerPage)
      .limit(coursePerPage);

    res.render("coursesU", {
      titleText: "موسسه اموزشی کارن",
      path: "/courses",
      courses,
      truncateTo200,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: coursePerPage * page < numberOfCourses,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfCourses / coursePerPage),
    });
  } catch (error) {
    //todo error 500
  }
};

const getSingleCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req?.query?.courseId).populate(
      "teacher"
    );
    if (!course) res.redirect("/courses");
    let { miladiToShamsi } = require("../utils/jalali");
    res.render("course", {
      titleText: "موسسه اموزشی کارن",
      path: "/course",
      course,
      miladiToShamsi,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/courses");
  }
};

const getGalleryU = async (req, res, next) => {
  let page = +req.query.page || 1;
  let imagePerPage = 9;
  try {
    let numberOfimages = await Gallery.find().countDocuments();
    let images = await Gallery.find()
      .skip((page - 1) * imagePerPage)
      .limit(imagePerPage);

    // images = images.reverse();
    res.render("galleryU", {
      titleText: "موسسه اموزشی کارن",
      path: "/gallery",
      images,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: imagePerPage * page < numberOfimages,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(numberOfimages / imagePerPage),
    });
  } catch (error) {}
};

const getEventsU = async (req, res, next) => {
  let page = +req.query.page || 1;
  let eventPerPage = 6;
  try {
    let numberOfEvents = await Event.find().countDocuments();
    let events = await Event.find()
      .skip((page - 1) * eventPerPage)
      .limit(eventPerPage);
    res.render("eventsU", {
      titleText: "موسسه اموزشی کارن",
      path: "/events",
      events,
      truncateTo200,
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

const getSingleEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req?.query?.eventId);
    if (!event) res.redirect("/events");
    res.render("event", {
      titleText: "موسسه اموزشی کارن",
      path: "/event",
      event,
      miladiToShamsi,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/events");
    // todo error 500
  }
};

const getBlogsU = async (req, res, next) => {
  let page = +req.query.page || 1;
  let blogPerPage = 6;
  try {
    let numberOfBlogs = await Blog.find().countDocuments();
    let blogs = await Blog.find({ status: "public" })
      .skip((page - 1) * blogPerPage)
      .limit(blogPerPage);
    res.render("blogsU", {
      titleText: "موسسه اموزشی کارن",
      path: "/blogs",
      blogs,
      truncateTo200,
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

const getSingleBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.query.blogId);
    if (!blog) res.redirect("/blogs");
    res.render("blog", {
      titleText: "موسسه اموزشی کارن",
      path: "/blog",
      blog,
      miladiToShamsi,
    });
  } catch (err) {
    console.log(err);
    res.redirect("/blogs");
    // todo error 500
  }
};

const getEnrollForEvent = (req, res, next) => {
  res.render("enrollforevent", {
    titleText: "موسسه اموزشی کارن",
    path: "/blog",
    eventId: req.query.eventId,
  });
};

const enrollApplicant = async (req, res, next) => {
  try {
    let applicant = await Applicant.findOne({ email: req.body.email });

    if (!applicant) {
      applicant = await Applicant.create({
        ...req.body,
        event: req.query.eventId,
      });
    } else {
      applicant.event.push(req.query.eventId);
      await Applicant.updateOne({ email: req.body.email }, { $set: applicant });
    }
    let event = await Event.findById(req.query.eventId);
    event.applicant.push(applicant.id);
    await Event.findByIdAndUpdate(event.id, { $set: event });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    //todo err500
  }
};

const getContactUs = (req, res, next) => {
  res.render("contactus.ejs", {
    titleText: "موسسه اموزشی کارن",
    path: "/contactus",
  });
};

const contactUs = async (req, res, next) => {
  try {
    await ContactUsMsg.create(req.body);
    res.status(200).json({ message: "sent" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const getAboutUs = (req, res, next) => {
  res.render("aboutus.ejs", {
    titleText: "موسسه اموزشی کارن",
    path: "/aboutus",
  });
};

const getBranches = (req, res, next) => {
  res.render("branches.ejs", {
    titleText: "موسسه اموزشی کارن",
    path: "/branches",
  });
};

module.exports = {
  getMainpage,
  getTeachersU,
  getCoursesU,
  getSingleCourse,
  getGalleryU,
  getEventsU,
  getSingleEvent,
  getBlogsU,
  getSingleBlog,
  getEnrollForEvent,
  enrollApplicant,
  getContactUs,
  contactUs,
  getAboutUs,
  getBranches,
};
