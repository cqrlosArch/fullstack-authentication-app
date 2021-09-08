/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    social_id: String,
    name: String,
    password: String,
    bio: String,
    email: {
        type: String,
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
    provider: String,
});

// eslint-disable-next-line consistent-return
userSchema.pre("save", function cypherPass(next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return next();

    // hash the password using our new salt
    bcrypt
        .genSalt(10)
        .then((salts) => {
            bcrypt
                .hash(this.password, salts)
                .then((hash) => {
                    this.password = hash;
                    next();
                })
                .catch((error) => {
                    next(error);
                });
        })
        .catch((error) => next(error));
});

userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
    },
});

userSchema.statics.comparePassword = (password, hash) => bcrypt.compare(password, hash);

module.exports = model("User", userSchema);
