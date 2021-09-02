const User = require("../models/User");

const updateUser = (req, res) => {
    const user = req.body;

    User.findById(req.local.id).then((user) => {});
};
