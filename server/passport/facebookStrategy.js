const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

const facebookStrategy = new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
        //check user table for anyone with a facebook ID of profile.id
        console.log(profile)
        User.findOne(
            {
                "social_id": profile.id,
            },
            function (err, user) {
                if (err) {
                    return done(err);
                }
                //No user was found... so create a new user with values from Facebook (all the profile. stuff)
                if (!user) {
                    user = new User({
                        social_id: profile?.id,
                        name: profile?.displayName,
                        username: profile?.username,
                        provider: "facebook",
                        displayName: profile?.displayName,
                        facebook: profile?._json,
                    });
                    console.log(user)
                    user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    console.log(user)
                    //found user. Return
                    return done(err, user);
                }
            }
        );
    }
);

module.exports = facebookStrategy;
