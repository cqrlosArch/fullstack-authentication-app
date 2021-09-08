const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

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

module.exports = {
    localLogin,
};
