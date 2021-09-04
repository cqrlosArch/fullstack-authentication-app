/* eslint-disable no-console */
const {server, app} = require("./app");

// Connect to database
require("./database");

const port = app.get("port");

server.listen(port, (err) => {
    if (err) console.log("Error on server init: ", err.message);
    console.log(`Server https running on port ${port}`);
});
