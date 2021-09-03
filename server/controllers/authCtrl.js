const User = require("../models/User");
const passport = require("../passport/local");

const signUp = (req, res) => {
    const { email, password } = req.body;
    
    User.findOne({ email })
        .then((user) => {
            if (user) {
                res.status(400).json({
                    msg: "User already exists",
                });
            } else {
                const newUser = new User({
                    email,
                    password,
                });
                newUser.save().then(() => {
                    res.status(201).send(newUser);
                });
            }
        })
        .catch(() => {
            res.status(500).send({ msg: "Server error" });
        });
};

// const signIn = (req, res) => {
//     loginStrategy.authenticate("local", { failureRedirect: "/login" }),
//         function (req, res) {
//             res.redirect("/");
//         };
// };

module.exports = {
    signUp,
 
};
