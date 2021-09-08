const { Router } = require("express");
const { signUp } = require("../controllers/authCtrl");
const passport = require("../passport");

const router = Router();

//controller
router.post("/signup", signUp);

//passportStrategy-localLogin
router.post("/signin", passport.authenticate("local-login", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/profile");
});


/* FACEBOOK ROUTER */
router.get("/facebook", passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
});

/* GOOGLE ROUTER */
router.get("/google", passport.authenticate("google", { scope: "https://www.googleapis.com/auth/userinfo.profile" }));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/profile");
});

/* GITHUB ROUTER */
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
});

/* TWITTER ROUTER */
router.get("/twitter", passport.authenticate("twitter", { state: { beep: "boop" } }));

router.get("/twitter/callback", passport.authenticate("twitter", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/profile");
});

module.exports = router;
