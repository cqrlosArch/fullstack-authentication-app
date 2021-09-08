const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");

const githubStrategy = new GithubStrategy(
    {
        clientID: process.env.GITHUB_APP_ID,
        clientSecret: process.env.GITHUB_APP_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
        //check user table for anyone with a facebook ID of profile.id
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
                        name: profile?._json?.name,
                        provider: "github",
                        photo:profile?._json?.avatar_url,
                        bio: profile?._json?.bio,
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

module.exports = githubStrategy;