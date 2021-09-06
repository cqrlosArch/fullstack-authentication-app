const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ social_id: profile.id }, function (err, user) {
            if (err) {
                return cb(err, false, { message: err });
            } else {
                if (user != "" && user != null) {
                    return cb(null, user, { message: "User " });
                } else {
                    console.log(profile)
                    const username = profile.displayName.split(" ");
                    const userData = new User({
                        name: profile.displayName,
                        username: username[0],
                        provider: "google",
                        social_id: profile.id,
                    });
                    // send email to user just in case required to send the newly created
                    // credentails to user for future login without using google login
                    userData.save(function (err, newuser) {
                        if (err) {
                            return cb(null, false, { message: err + " !!! Please try again" });
                        } else {
                            return cb(null, newuser);
                        }
                    });
                }
            }
        });
    }
);

module.exports = googleStrategy;