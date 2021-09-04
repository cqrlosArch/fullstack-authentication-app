const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

const localLogin = new LocalStrategy(
    {
        usernameField: "email",
     
    },
    async (email, password, done) => {
        console.log(email, password);
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: "Invalid email" });
            }

            // Devuelve una promesa (await)
            const match = await User.comparePassword(password, user.password);
            console.log(match);
            if (match) {
                return done(null, user);
            }

            return done(null, false, { message: "Invalid password" });
        } catch (error) {
            return done(error);
        }
    }
);

passport.use("local-login", localLogin);

module.exports = passport;
