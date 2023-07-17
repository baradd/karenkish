const Yup = require("yup");

const studentValidatorSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "حداقل کاراکتر مجاز برای نام 2 است")
    .max(50, "حداکثر کاراکتر مجاز برای نام 50 است")
    .required("لطفا نام خود را وارد کنید"),
  lastname: Yup.string()
    .min(2, "حداقل کاراکتر مجاز برای نام خانوادگی 2 است")
    .max(50, "حداکثر کاراکتر مجاز برای نام خانوادگی 50 است")
    .required("لطفا نام خانوادگی خود را وارد کنید"),
  email: Yup.string()
    .email("لطفا ایمیل صحیح وارد کنید")
    .max(70, "حداکثر کاراکتر مجاز برای نام کاربری 70 است")
    .required("لطفا نام کربری خود را وارد کنید"),
  password: Yup.string()
    .min(4, "گذرواژه باید حداقل 4 کاراکتر باشد")
    .required("لطفا گذرواژه وارد کنید"),
  confirmPassword: Yup.string()
    .min(4, "تکرار گذر وازه باید حد اقل 4 کاراکتر باشد")
    .required("لطفا تکرار گذروازه را وارد کنید")
    .oneOf([Yup.ref("password")], "گذر واژه و تکرار ان یکسان نیستند"),
  phone: Yup.string().max(15, "حداکثر کاراکتر مجاز برای شماره تماس 15 است"),
});

const blogValidatorSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای عنوان 5 است")
    .max(75, "حداکثر کاراکتر مجاز برای عنوان 75 است")
    .required("لطفا عنوان را وارد کنید"),
  body: Yup.string()
    .min(100, "حداقل متن بلاگ 100 است")
    .max(2100, "حداکثر متن بلاگ 2100 است")
    .required("لطفا متن را وارد کنید"),
  status: Yup.mixed().oneOf(
    ["public", "private"],
    "یکی از گزینه های عمومی یاخصوصی را انتخاب کنید"
  ),
});

const teacherValidatorSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای نام 5 است")
    .max(100, "حداکثر کاراکتر مجاز برای نام 100 است")
    .required("لطفا نام و نام خانوادگی خود را وارد کنید"),
  level: Yup.mixed()
    .oneOf(
      [
        "starter",
        "elemantary",
        "intermediate",
        "upper intermediate",
        "advance",
      ],
      "لطفا سطح استاد را وارد کنید"
    )
    .required("لطفا سطح استاد را وارد کنید"),
  email: Yup.string()
    .email("لطفا ایمیل صحیح وارد کنید")
    .max(70, "حداکثر کاراکتر مجاز برای نام کاربری 70 است")
    .required("لطفا نام کاربری خود را وارد کنید"),
  phone: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای شماره تماس 5 است")
    .max(15, "حداکثر کاراکتر مجاز برای شماره تماس 15 است"),
  address: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای ادرس 5 است")
    .max(100, "حداکثر کاراکتر مجاز برای ادرس 100 است"),
});

const statisticValidatorSchema = Yup.object().shape({
  numStudents: Yup.number().required("لطفا تعداد دانش اموزان را وارد کنید"),
  numStaffs: Yup.number().required("لطفا تعداد کارکنان را وارد کنید"),
  numExams: Yup.number().required(
    "لطفا تعداد ازمون های برگزار شده را وارد کنید"
  ),
  numBranches: Yup.number().required("لطفا تعداد شعب را وارد کنید"),
});

const galleryValidatorSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "حداقل متن عکس 3 است")
    .max(20, "حداکثر متن عکس 20 است")
    .required("لطفا متنی برای عکس بنوسید"),
});

const applicantValidatorSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "حداقل کاراکتر مجاز برای نام 2 است")
    .max(50, "حداکثر کاراکتر مجاز برای نام 50 است")
    .required("لطفا نام خود را وارد کنید"),
  lastname: Yup.string()
    .min(2, "حداقل کاراکتر مجاز برای نام خانوادگی 2 است")
    .max(50, "حداکثر کاراکتر مجاز برای نام خانوادگی 50 است")
    .required("لطفا نام خانوادگی خود را وارد کنید"),
  email: Yup.string()
    .email("لطفا ایمیل صحیح وارد کنید")
    .max(70, "حداکثر کاراکتر مجاز برای نام کاربری 70 است")
    .required("لطفا نام کربری خود را وارد کنید"),
  phone: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای شماره تماس 5 است")
    .max(15, "حداکثر کاراکتر مجاز برای شماره تماس 15 است"),
  address: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای ادرس 5 است")
    .max(100, "حداکثر کاراکتر مجاز برای ادرس 100 است"),
  rules: Yup.mixed()
    .oneOf(["on"], "با قوانین موافقت کنید")
    .required("با قوانین موافقت کنید"),
});

const eventValidatorSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "حداقل کاراکتر مجاز برای عنوان 3 است")
    .max(75, "حداکثر کاراکتر مجاز برای عنوان 75 است")
    .required("لطفا عنوان را وارد کنید"),

  body: Yup.string()
    .min(100, "حداقل متن رویداد 100 است")
    .max(2100, "حداکثر متن رویداد 2100 است")
    .required("لطفا متن را وارد کنید"),

  organizer: Yup.string()
    .min(3, "حداقل کاراکتر مجاز برای برگزار کننده 3 است")
    .max(100, "حداکثر کاراکتر مجاز برای برگزار کننده 100 است"),
  place: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای مکان 5 است")
    .max(100, "حداکثر کاراکتر مجاز برای مکان 100 است")
    .required("لطفا مکان برگزاری رویداد را وارد کنید"),
  date: Yup.date("تاریخ اشتباه").required("لطفا تاریخ برگزاری را وارد کنید"),
  time: Yup.string().required("لطفا زمان برگزاری را وارد کنید"),
  duration: Yup.string()
    .min(2, "حداقل کاراکتر مجاز برای مدت دوره 2 است")
    .max(20, "حداکثر کاراکتر مجاز برای مدت دوره 20 است"),
  price: Yup.number().min(0, "مبلغ نمی تواند از 0 کمتر باشد"),
});

const courseValidatorSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "حداقل کاراکتر مجاز برای عنوان 3 است")
    .max(75, "حداکثر کاراکتر مجاز برای عنوان 75 است")
    .required("لطفا عنوان را وارد کنید"),

  body: Yup.string()
    .min(100, "حداقل متن دوره 100 است")
    .max(2100, "حداکثر متن دوره 2100 است")
    .required("لطفا متن را وارد کنید"),

  start: Yup.string()
    .max(10, "تاریخ را درست وارد کنید")
    .required("لطفا تاریخ شروع دوره را وارد کنید"),
  end: Yup.string()
    .max(10, "تاریخ را درست وارد کنید")
    .required("لطفا تاریخ اتمام دوره را وارد کنید"),
  sessionTime: Yup.number("مدت زمان هر جلسه بر حسب دقیقه می باشد").required(
    "لطفا مدت زمان هر جلسه را وارد کنید"
  ),
});

const contactUsValidatorSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای نام 5 است")
    .max(100, "حداکثر کاراکتر مجاز برای نام 100 است")
    .required("لطفا نام و نام خانوادگی خود را وارد کنید"),
  email: Yup.string()
    .email("لطفا ایمیل صحیح وارد کنید")
    .max(70, "حداکثر کاراکتر مجاز برای ایمیل 70 است")
    .required("لطفا ایمیل خود را وارد کنید"),
  phone: Yup.string()
    .min(5, "حداقل کاراکتر مجاز برای شماره تماس 5 است")
    .max(15, "حداکثر کاراکتر مجاز برای شماره تماس 15 است"),
  title: Yup.string()
    .min(3, "حداقل کاراکتر مجاز برای عنوان 3 است")
    .max(75, "حداکثر کاراکتر مجاز برای عنوان 75 است")
    .required("لطفا عنوان را وارد کنید"),
  body: Yup.string()
    .min(10, "حداقل متن دوره 10 است")
    .max(2100, "حداکثر متن دوره 2100 است")
    .required("لطفا متن را وارد کنید"),
});
module.exports = {
  studentValidatorSchema,
  applicantValidatorSchema,
  blogValidatorSchema,
  courseValidatorSchema,
  eventValidatorSchema,
  galleryValidatorSchema,
  statisticValidatorSchema,
  teacherValidatorSchema,
  contactUsValidatorSchema,
};
