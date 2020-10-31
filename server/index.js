const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/index.js");

const PORT = process.env.PORT || 3000;
const { listingRouter } = require("./db/routes/listingRoutes");
const { userRouter } = require("./db/routes/userRoutes");
const { availabilityRouter } = require("./db/routes/availabilityRoutes");
const { dashboardRouter } = require("./db/routes/dashboardRoutes.js");
const { mapRouter } = require("./api/Map");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { requestRouter } = require("./db/routes/requestRoutes.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const DIR = path.join(__dirname, "../build");
const html_file = path.join(DIR, "index.html");
app.use(express.static(DIR));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

<<<<<<< HEAD
/// ///////////////////////// ROUTES ////////////////////////////

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.use("/listing", listingRouter);
app.use("/user", userRouter);
app.use("/availability", availabilityRouter);
app.use("/dashboardInfo", dashboardRouter);
app.use("/request", requestRouter);

app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

app.use("/map", mapRouter);
app.use(express.static(path.join(__dirname, "../build")));
=======
app.use('/listing', listingRouter);
app.use('/user', userRouter);
app.use('/availability', availabilityRouter);
app.use('/dashboardInfo', dashboardRouter);

app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

app.use('/map', mapRouter);
app.use(express.static(path.join(__dirname, '../build')));
>>>>>>> (add) route for dashboard info

app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
