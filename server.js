const path = require("path");
const express = require("express");
const app = express();
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorEvents");
const cors = require("cors");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
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

// middelware for cookie
app.use(cookieParser());

// static files middleware
// all static files like css ,img & text files should be in public folder which then accessed by express automatically
app.use(express.static(path.join(__dirname, "/public")));

// routers
app.use("^(/)", require("./routes/root.js"));
app.use("^(/auth)", require("./routes/authUser.js"));
app.use("^(/refresh)", require("./routes/refresh.js"));
app.use("^(/register)", require("./routes/register.js"));
app.use(verifyJWT);
app.use("^(/employees)", require("./routes/api/employees.js"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is activated on localhost:${PORT} `));
