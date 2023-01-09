const path = require("path");
const express = require("express");
const app = express();
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorEvents");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

// Custom middleware
app.use(logger);
// CORS -> Cross Origin Resource Sharing
const whiteList = ["http://www.production.com", "http:localhost:3501"];
const corsOption = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) === 1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} is not allowed`));
    }
  },
};
app.use(cors(corsOption));

// express have inbuild middlewares
// urlencoded middleware
app.use(express.urlencoded({ extended: false }));

// json middleware
app.use(express.json(path.join(__dirname, "data", "data.json")));

// static files middleware
// all static files like css ,img & text files should be in public folder which then accessed by express automatically
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  // res.sendFile("/views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

// app.get("/css/style.css", (req, res) => {
//   console.log(`url: ${req.url}\tmethod: ${req.method}`);
//   console.log("path is " + path.join(__dirname, "css", "style.css"));
//   res.sendFile(path.join(__dirname, "css", "style.css"));
// });

app.get("/redirect(.html)?", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  res.redirect("/new-page.html");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is activated on localhost:${PORT} `));
