const validators = require("../models/secure/validators");
const fileValidators = require("../models/secure/filevalidators");
const { Teacher } = require("../models/Teacher");
const { Course } = require("../models/Course");
const { Event } = require("../models/Event");
const { Blog } = require("../models/Blog");

const registerStudentValidator = async (req, res, next) => {
  try {
    await validators.studentValidatorSchema.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    console.log(err.errors);
    return res.render("register", {
      titleText: "ثبت نام",
      path: "/register",
      err: err.errors,
    });
  }
};

const teacherImageValidator = async (req, res, next) => {
  const teacher = await Teacher.findById(req?.query?.teacherId);
  try {
    if (req.files) {
      await fileValidators.blogImageSchema.validate(req.files.image, {
        abortEarly: false,
      });
      return next();
    } else {
      if (!teacher) {
        res.render("add-teacher", {
          titleText: "داشبورد || معلم جدید",
          path: "/dashboard/add-teacher",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["عکس انتخاب کنید"],
        });
      } else {
        res.render("edit-teacher", {
          titleText: "داشبورد || ویرایش معلم",
          path: "/dashboard/edit-teacher",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["عکس انتخاب کنید"],
          teacher,
        });
      }
    }
  } catch (err) {
    console.log(err);
    if (!teacher) {
      res.render("add-teacher", {
        titleText: "داشبورد || معلم جدید",
        path: "/dashboard/add-teacher",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
      });
    } else {
      res.render("edit-teacher", {
        titleText: "داشبورد || ویرایش معلم",
        path: "/dashboard/edit-teacher",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        teacher,
      });
    }
  }
};

const addTeacherValidator = async (req, res, next) => {
  try {
    await validators.teacherValidatorSchema.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    console.log(err);
    res.render("add-teacher", {
      titleText: "داشبورد || معلم جدید",
      path: "/dashboard/add-teacher",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      err: err.errors,
    });
  }
};

const galleryImagesValidator = async (req, res, next) => {
  try {
    if (req.files) {
      await fileValidators.blogImageSchema.validate(req.files.file, {
        abortEarly: false,
      });
      return next();
    } else {
      res.status(402).json({ message: "عکس انتخاب کنید" });
    }
  } catch (err) {
    console.log(err.errors);
    res.status(402).json({ err: err.errors });

    res.render("gallery", {
      titleText: "داشبورد || گالری",
      path: "/dashboard/gallery",
      layout: "./layouts/dashlayout.ejs",
      user: req.user,
      err: err.errors,
    });
  }
};

const addCourseValidator = async (req, res, next) => {
  let course = await Course.findById(req?.query?.courseId);
  try {
    await validators.courseValidatorSchema.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    console.log(err.errors);
    const teachers = await Teacher.find();
    if (!course) {
      res.render("add-course", {
        titleText: "داشبورد || ایجاد کلاس",
        path: "/dashboard/add-course",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        teachers,
      });
    } else {
      res.render("edit-course", {
        titleText: "داشبورد || ویرایش کلاس",
        path: "/dashboard/edit-course",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        teachers,
        course,
      });
    }
  }
};

const addCourseImageValidator = async (req, res, next) => {
  const teachers = await Teacher.find();
  let course = await Course.findById(req?.query?.courseId);
  try {
    if (req.files) {
      await fileValidators.blogImageSchema.validate(req.files.image, {
        abortEarly: false,
      });
      return next();
    } else {
      if (!course) {
        res.render("add-course", {
          titleText: "داشبورد || ایجاد کلاس",
          path: "/dashboard/add-course",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["لطفا عکس دوره را انتخاب کنید"],
          teachers,
        });
      } else {
        res.render("edit-course", {
          titleText: "داشبورد || ویرایش کلاس",
          path: "/dashboard/edit-course",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["لطفا عکس دوره را انتخاب کنید"],
          teachers,
          course,
        });
      }
    }
  } catch (err) {
    console.log(err.errors);
    if (!course) {
      res.render("add-course", {
        titleText: "داشبورد || ایجاد کلاس",
        path: "/dashboard/add-course",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        teachers,
      });
    } else {
      res.render("edit-course", {
        titleText: "داشبورد || ویرایش کلاس",
        path: "/dashboard/add-course",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        teachers,
        course,
      });
    }
  }
};

const addEventImageValidator = async (req, res, next) => {
  let event = await Event.findById(req?.query?.eventId);
  try {
    if (req.files) {
      await fileValidators.blogImageSchema.validate(req.files.image, {
        abortEarly: false,
      });
      return next();
    } else {
      if (!event) {
        res.render("add-event", {
          titleText: "داشبورد || ایجاد رویداد",
          path: "/dashboard/add-event",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["لطفا عکس دوره را انتخاب کنید"],
        });
      } else {
        res.render("edit-event", {
          titleText: "داشبورد || ویرایش رویداد",
          path: "/dashboard/edit-event",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["لطفا عکس دوره را انتخاب کنید"],
          event,
        });
      }
    }
  } catch (err) {
    console.log(err.errors);
    if (!event) {
      res.render("add-event", {
        titleText: "داشبورد || ایجاد رویداد",
        path: "/dashboard/add-event",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
      });
    } else {
      res.render("edit-event", {
        titleText: "داشبورد || ویرایش رویداد",
        path: "/dashboard/edit-event",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        event,
      });
    }
  }
};

const addEventValidator = async (req, res, next) => {
  let event = await Event.findById(req?.query?.eventId);
  try {
    await validators.eventValidatorSchema.validate(req.body, {
      abortEarly: false,
    });
    return next();
  } catch (err) {
    console.log(err.errors);
    if (!event) {
      res.render("add-event", {
        titleText: "داشبورد || ایجاد رویداد",
        path: "/dashboard/add-event",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
      });
    } else {
      res.render("edit-event", {
        titleText: "داشبورد || ویرایش رویداد",
        path: "/dashboard/edit-event",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        event,
      });
    }
  }
};

const addBlogImageValidator = async (req, res, next) => {
  let blog = await Blog.findById(req?.query?.blogId);
  try {
    if (req.files) {
      await fileValidators.blogImageSchema.validate(req.files.image, {
        abortEarly: false,
      });
      next();
    } else {
      if (!blog) {
        res.render("add-blog", {
          titleText: "داشبورد || بلاگ جدید",
          path: "/dashboard/add-blog",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["عکس انتخاب نکردید"],
        });
      } else {
        res.render("edit-blog", {
          titleText: "داشبورد || ویرایش بلاگ",
          path: "/dashboard/edit-blog",
          layout: "./layouts/dashlayout.ejs",
          user: req.user,
          err: ["عکس انتخاب نکردید"],
          blog,
        });
      }
    }
  } catch (err) {
    console.log(err);
    if (!blog) {
      res.render("add-blog", {
        titleText: "داشبورد || بلاگ جدید",
        path: "/dashboard/add-blog",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
      });
    } else {
      res.render("edit-blog", {
        titleText: "داشبورد || ویرایش بلاگ",
        path: "/dashboard/edit-blog",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        blog,
      });
    }
  }
};

const addBlogValidator = async (req, res, next) => {
  let blog = await Blog.findById(req?.query?.blogId);
  try {
    await validators.blogValidatorSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    console.log(err);
    if (!blog) {
      res.render("add-blog", {
        titleText: "داشبورد || بلاگ جدید",
        path: "/dashboard/add-blog",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
      });
    } else {
      res.render("edit-blog", {
        titleText: "داشبورد || ویرایش بلاگ",
        path: "/dashboard/edit-blog",
        layout: "./layouts/dashlayout.ejs",
        user: req.user,
        err: err.errors,
        blog,
      });
    }
  }
};

const applicantValidator = async (req, res, next) => {
  try {
    await validators.applicantValidatorSchema.validate(
      { ...req.body, rules: req?.body?.rules ? req.body.rules : "off" },
      {
        abortEarly: false,
      }
    );
    next();
  } catch (err) {
    console.log(err.errors);
    res.render("enrollforevent", {
      titleText: "موسسه اموزشی کارن",
      path: "/blog",
      eventId: req.query.eventId,
      err: err.errors,
    });
  }
};

const contactUsMessageValidator = async (req, res, next) => {
  try {
    await validators.contactUsValidatorSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    res.status(402).json({ err: err.errors });
  }
};
module.exports = {
  registerStudentValidator,
  teacherImageValidator,
  addTeacherValidator,
  galleryImagesValidator,
  addCourseValidator,
  addCourseImageValidator,
  addCourseValidator,
  addEventImageValidator,
  addEventValidator,
  addBlogImageValidator,
  addBlogValidator,
  applicantValidator,
  contactUsMessageValidator,
};
