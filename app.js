require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const { applyPassportStrategy } = require("./core/passport.js");

//Set session store
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 }
  })
);

//Apply passport
app.use(passport.initialize());
app.use(passport.session());
applyPassportStrategy(passport);

//routes
const userRouter = require("./routes/user.router");

const PORT = process.env.PORT || 8082;

//Middlewares
app.use(cors());
app.use(express.json());

//swagger setup
require("./swagger/swagger")(app);

//routes
app.use("/api", userRouter);

//catch undefined routes
app.use((req, res, next) => {
  res.status(404);
  if (req.accepts("json")) {
    return res.status(httpStatusCode).json(response.errorWith(null, 404, "URL Not found", "URL Not found"));
  }
  next();
});

const initApp = async () => {
  try {
    require("./core/db.js");
    /**
     * Start the web server on the specified port.
     */
    app.listen(PORT, () => console.log(`🚀 Server is up and running on port ${PORT} 🚀 `));
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
