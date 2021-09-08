const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.addStrategy(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: "Invalid email" });
                }

                const match = User.comparePassword(password);

                if (match) {
                    return done(null, user);
                }

                return done(null, false, { message: "Invalid password" });
            } catch (error) {
                return done(error);
            }
        }
    )
);
