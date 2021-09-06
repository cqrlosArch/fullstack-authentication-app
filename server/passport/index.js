const passport = require("passport");
const { localLogin } = require("./localStrategy");
const facebookStrategy = require("./facebookStrategy");
const googleStrategy = require("./googleStrategy");
const githubStrategy = require("./githubStrategy");

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
passport.use("google", googleStrategy);
passport.use("github", githubStrategy);

module.exports = passport;
