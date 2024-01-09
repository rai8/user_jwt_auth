const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const { User } = require("./db");
const { roles } = require("../constants/constants");

module.exports.applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET;

  //Admin strategy
  passport.use(
    "admin",
    new Strategy(options, async (payload, next) => {
      const user = await User.findOne({ where: { email: payload.email, roleId: roles.Admin } });
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
  );

  // Standard user strategy
  passport.use(
    "user",
    new Strategy(options, async (payload, next) => {
      const user = await User.findOne({ where: { email: payload.email, roleId: roles.User } });
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
  );
};

module.exports.authMiddlewareAdmin = passport.authenticate("admin", { session: false });
module.exports.authMiddlewareUser = passport.authenticate("user", { session: false });

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
