const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    name: String,
    password: String,
    bio: String,
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: (v) =>
                new Promise((resolve) => {
                    resolve(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v));
                }),
        },
    },
    photo: String,
    phone: Number,
});

module.exports = model("User", userSchema);
