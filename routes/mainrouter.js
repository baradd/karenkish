const router = require("express").Router();
const mainController = require("../controllers/maincontroller");
const validators = require("../middlewares/validators");

router.get("", mainController.getMainpage);

router.get("/teachers", mainController.getTeachersU);

router.get("/courses", mainController.getCoursesU);

router.get("/course", mainController.getSingleCourse);

router.get("/gallery", mainController.getGalleryU);

router.get("/events", mainController.getEventsU);

router.get("/event", mainController.getSingleEvent);

router.get("/blogs", mainController.getBlogsU);

router.get("/blog", mainController.getSingleBlog);

router.get("/enroll", mainController.getEnrollForEvent);

router.get("/aboutus", mainController.getAboutUs);

router.get("/branches", mainController.getBranches);

router.post(
  "/enroll",
  validators.applicantValidator,
  mainController.enrollApplicant
);

router.get("/contactus", mainController.getContactUs);

router.post(
  "/contactus",
  validators.contactUsMessageValidator,
  mainController.contactUs
);

module.exports = { router };
