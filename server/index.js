/* eslint-disable no-console */
const app = require("./app");

// Connect to database
require("./database");

const port = app.get("port");

app.listen(port, (err) => {
    if (err) console.log("Error on server init: ", err.message);
    console.log(`Server running on port ${port}`);
});
