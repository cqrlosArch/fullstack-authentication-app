const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const localLogin = new LocalStrategy(
    {
        usernameField: "email",
    },
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            console.log(user)
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!User.comparePassword(password, user.password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
    // async (email, password, done) => {
    //     console.log(email, password);
    //     try {
    //         await User.findOne({ email:email }, async (err, user) => {
    //             if (!user) {
    //                 return done(null, false, { message: "Invalid email" });
    //             }
    //             const match = await User.comparePassword(password, user.password);
    //             console.log(match);
    //             if (match) {
    //                 return done(null, user);
    //             }

    //             // Devuelve una promesa (await)

    //             return done(null, false, { message: "Invalid password" });
    //         });
    //     } catch (error) {
    //         return done(error);
    //     }
    // }
);

module.exports = {
    localLogin,
};
