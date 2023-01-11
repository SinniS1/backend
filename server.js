const path = require("path");
const express = require("express");
const app = express();
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorEvents");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// Custom middleware
app.use(logger); // -> uncomment in when need to get logs details
// CORS -> Cross Origin Resource Sharing

app.use(cors(require("./config/corsOption")));

// express have inbuild middlewares
// urlencoded middleware
app.use(express.urlencoded({ extended: false }));

// json middleware
app.use(express.json(path.join(__dirname, "data", "data.json")));

// static files middleware
// all static files like css ,img & text files should be in public folder which then accessed by express automatically
app.use(express.static(path.join(__dirname, "/public")));

// routers
app.use("/employees", require("./routes/api/employees.js"));
app.use("/", require("./routes/root.js"));

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is activated on localhost:${PORT} `));
