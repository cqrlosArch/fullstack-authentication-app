const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
     
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log("profile: ", profile);
        try {
            let user = await User.findOne({ social_id: profile.id });
            if (user) return done(null, user);
            user = new User({
                social_id: profile?.id,
                display_name: profile?.displayName,
                email: profile?.emails,
                photo: profile?.photos[0]?.value,
                provider: profile?.provider,
                google: profile?._json,
            });
            user = await user.save();
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
);

module.exports = googleStrategy;
