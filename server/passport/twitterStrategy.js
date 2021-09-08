const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/User");

const twitterStrategy = new TwitterStrategy(
    {
        consumerKey: process.env.TWITTER_APP_API_ID,
        consumerSecret: process.env.TWITTER_APP_API_SECRET,
        accessToken: process.env.TWITTER_APP_TOKEN_ID,
        secretAccessToken: process.env.TWITTER_APP_TOKEN_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL,
        store: true,
    },
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        //check user table for anyone with a facebook ID of profile.id
        User.findOne(
            {
                social_id: profile.id,
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
                        provider: "twitter",
                        photo: profile?.photos[0]?.value,
                        bio: profile?._json?.description,
                    });

                    user.save(function (err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    //found user. Return
                    return done(err, user);
                }
            }
        );
    }
);

module.exports = twitterStrategy;
