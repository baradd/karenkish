const Yup = require('yup');

const studentImageSchema = Yup.object().shape({
  size: Yup.number().max(100000),
  mimetype: Yup.mixed().oneOf(['image/png', 'image/jpg', 'image/jpeg']),
});

const blogImageSchema = Yup.object().shape({
  size: Yup.number().max(3145728, 'سایز فایل باید کمتر از 3 مگابایت باشد'), //3 mb for each image
  mimetype: Yup.mixed().oneOf(
    ['image/jpeg', 'image/jpg'],
    'فرمت فایل باید JPG باشد'
  ),
});

module.exports = { studentImageSchema, blogImageSchema };
