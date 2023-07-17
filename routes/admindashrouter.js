const router = require("express").Router();
const adminController = require("../controllers/admincontroller");
const auth = require("../middlewares/auth");
const adminDashController = require("../controllers/adminDashController");
const validators = require("../middlewares/validators");

router.get("", auth.autheticatedAdmin, adminDashController.getAdminDash);

router.get("/logout", auth.autheticatedAdmin, adminController.logout);

router.get(
  "/edit-statistic",
  auth.autheticatedAdmin,
  adminDashController.getEditStatistic
);

router.post(
  "/edit-statistic",
  auth.autheticatedAdmin,
  adminController.editStatistic
);

router.get(
  "/add-teacher",
  auth.autheticatedAdmin,
  adminDashController.getAddTeacher
);

router.post(
  "/add-teacher",
  auth.autheticatedAdmin,
  validators.teacherImageValidator,
  validators.addTeacherValidator,
  adminController.addTeacher
);
router.get(
  "/teachers",
  auth.autheticatedAdmin,
  adminDashController.getTeachers
);
router.get(
  "/edit-teacher",
  auth.autheticatedAdmin,
  adminDashController.getEditTeacher
);
router.post(
  "/edit-teacher",
  auth.autheticatedAdmin,
  validators.teacherImageValidator,
  validators.addTeacherValidator,
  adminController.editTeacher
);

router.get("/gallery", auth.autheticatedAdmin, adminDashController.getGallery);

router.post(
  "/gallery",
  auth.autheticatedAdmin,
  validators.galleryImagesValidator,
  adminController.galleryUploader
);

router.get(
  "/add-course",
  auth.autheticatedAdmin,
  adminDashController.getAddCourse
);
router.post(
  "/add-course",
  auth.autheticatedAdmin,
  validators.addCourseImageValidator,
  validators.addCourseValidator,
  adminController.addCourse
);

router.get("/courses", auth.autheticatedAdmin, adminDashController.getCourses);

router.post(
  "/delete-course",
  auth.autheticatedAdmin,
  adminController.deleteCourse
);

router.post(
  "/delete-teacher",
  auth.autheticatedAdmin,
  adminController.deleteTeacher
);
router.get(
  "/edit-course",
  auth.autheticatedAdmin,
  adminDashController.getEditCourse
);

router.post(
  "/edit-course",
  auth.autheticatedAdmin,
  validators.addCourseImageValidator,
  validators.addCourseValidator,
  adminController.editCourse
);

router.get(
  "/add-event",
  auth.autheticatedAdmin,
  adminDashController.getAddEvent
);
router.post(
  "/add-event",
  auth.autheticatedAdmin,
  validators.addEventImageValidator,
  validators.addEventValidator,
  adminController.addEvent
);
router.get("/events", auth.autheticatedAdmin, adminDashController.getEvents);

router.post(
  "/delete-event",
  auth.autheticatedAdmin,
  adminController.deleteEvent
);

router.get(
  "/edit-event",
  auth.autheticatedAdmin,
  adminDashController.getEditEvent
);

router.post(
  "/edit-event",
  auth.autheticatedAdmin,
  validators.addEventImageValidator,
  validators.addEventValidator,
  adminController.editEvent
);

router.post(
  "/add-blog",
  auth.autheticatedAdmin,
  validators.addBlogImageValidator,
  validators.addBlogValidator,
  adminController.addBlog
);

router.get("/blogs", auth.autheticatedAdmin, adminDashController.getBlogs);

router.get("/add-blog", auth.autheticatedAdmin, adminDashController.getAddBlog);

router.post("/delete-blog", auth.autheticatedAdmin, adminController.deleteBlog);

router.get(
  "/edit-blog",
  auth.autheticatedAdmin,
  adminDashController.getEditBlog
);

router.post(
  "/edit-blog",
  auth.autheticatedAdmin,
  validators.addBlogImageValidator,
  validators.addBlogValidator,
  adminController.editBlog
);

module.exports = { router };
