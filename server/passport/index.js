const passport = require("passport");
const { localLogin } = require("./localStrategy");
const facebookStrategy = require("./facebookStrategy");

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use("local-login", localLogin);
passport.use("facebook", facebookStrategy);

module.exports = passport;
