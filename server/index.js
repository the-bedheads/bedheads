const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/index.js");
const { listingRouter } = require("./db/routes/listingRoutes");
const { userRouter } = require("./db/routes/userRoutes");
const { availabilityRouter } = require("./db/routes/availabilityRoutes");
const { mapRouter } = require("./api/Map");

const PORT = process.env.PORT || 3000;
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./db/index.js");
const { listingRouter } = require("./db/routes/listingRoutes");
const { userRouter } = require("./db/routes/userRoutes");
const { availabilityRouter } = require("./db/routes/availabilityRoutes");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { User } = require("./db/index.js");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const { User } = require("./db/index.js");
const { default: e } = require("express");

app.use("/listing", listingRouter);
app.use("/user", userRouter);
app.use("/availability", availabilityRouter);
app.use("/map", mapRouter);

app.use(express.static(path.join(__dirname, "../build")));
//////////////////////////// MIDDLEWARE ////////////////////////////
const app = express();
app.use(bodyParser.json()); // req.body
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.use(cookieParser());

//////////////////////////// ROUTES ////////////////////////////
app.use("/auth", require("./routes/jwtAuth"));
app.use("/dashboard", require("./routes/dashboard"));

//////////////////////////// CONFIRM DATABASE CONNECTION ////////////////////////////
app.listen(PORT, () => {
  console.log(`Listening on port :${PORT}!`);
});
