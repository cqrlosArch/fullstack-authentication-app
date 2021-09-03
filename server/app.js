const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const flash = require('connect-flash');
const passport = require("passport")

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


app.set("port", process.env.PORT || 3000);

// Utils
app.use(morgan("dev"));

// Root routes
app.use("/profile", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));

module.exports = app;
