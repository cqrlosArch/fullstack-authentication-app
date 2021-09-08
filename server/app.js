const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(passport.initialize());
app.use(passport.session());
const https = require("https");
const fs = require("fs");

const key = fs.readFileSync("./SSL/httplocalhost3000.key");
const cert = fs.readFileSync("./SSL/httplocalhost3000.cert");
const options = {
    key: key,
    cert: cert,
};

app.use(flash());

app.set("port", process.env.PORT || 3000);

// Utils
app.use(morgan("dev"));

// Root routes
app.use("/profile", require("./routes/userRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const server = https.createServer(options, app);
module.exports = { server, app };
