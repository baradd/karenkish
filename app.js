//# External modules
const express = require("express");
const appRoot = require("app-root-dir").get();
const ejsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

//#Internal modules
const path = require("path");
const { connectDB } = require("./config/database");
const passport = require("passport");

//*Confuguration app
const app = express();

dotenv.config({ path: "./.env.production" });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
//Connection to Database
connectDB();

//*Template engine EJS
app.set("view engine", "ejs");
app.set("views", "views");
app.use(ejsLayout);
app.set("layout", "./layouts/mainlayout.ejs");

//*Session config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
  })
);



//*Passport authentication
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

//*Flash messages
app.use(flash());

//*Set static folder "public"
app.use(express.static(path.join(appRoot, "public")));

//*routers
app.use("/", require("./routes/mainrouter").router);
app.use("/", require("./routes/userrouter").router);
app.use("/", require("./routes/adminrouter").router);
app.use("/dashboard", require("./routes/admindashrouter").router);

//! Error handling
// app.use(require("./middlewares/errors").errorHandler);
app.use(require("./middlewares/errors").get404);
//* app in running
app.listen(process.env.PORT, () => {
  console.log(`Server is running ${process.env.PORT}`);
});
