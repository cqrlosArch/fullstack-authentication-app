const { Router } = require("express");
const { signUp } = require("../controllers/authCtrl");
const passport = require("../passport/localStrategy");

const router = Router();

//controller
router.post("/signup", signUp);

//passportStrategy
router.post("/signin", passport.authenticate("local-login", { failureRedirect: "/login" }), function (req, res) {
    res.redirect("/profile");
});

module.exports = router;
