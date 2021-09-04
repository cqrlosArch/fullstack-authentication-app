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

//passportStrategy-facebook
router.post("/facebook", passport.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/profile");
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/profile');
  });

module.exports = router;
