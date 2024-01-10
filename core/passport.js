const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("./db");
const constants = require("../constants/constants");
const response = require("../response/response");

module.exports.applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET;
  options.passReqToCallback = true;

  passport.use(
    "user",
    new Strategy(options, async (req, payload, next) => {
      try {
        const user = await User.findOne({ where: { userId: payload.userId, isArchived: false } });

        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      } catch (error) {
        next(error, false);
      }
    })
  );
};

module.exports.verifyToken = (req, res, next) => {
  passport.authenticate("user", { session: false, failWithError: true }, (err, user) => {
    let httpStatusCode = constants.statusCode.UNAUTHORIZED_ACCESS;
    if (err) return res.status(httpStatusCode).json(response.errorWith(null, httpStatusCode, "Internal server error", "Internal server error"));
    if (!user) return res.status(httpStatusCode).json(response.errorWith(null, httpStatusCode, "Unauthorized access. Please contact your administrator", "Unauthorized access. Please contact your administrator"));
    req.user = user;
    return next();
  })(req, res, next);
};

//perform user serialization
passport.serializeUser(function (user, done) {
  done(null, user.userId);
});

//perform user deserialization
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ where: { userId: userId } });
    done(null, user);
  } catch (error) {
    console.log(error.message);
  }
});
