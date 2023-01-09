const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("^/$|index(.html)?", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  // res.sendFile("/views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/css/style.css", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  console.log("path is " + path.join(__dirname, "css", "style.css"));
  res.sendFile(path.join(__dirname, "css", "style.css"));
});

app.get("/redirect(.html)?", (req, res) => {
  console.log(`url: ${req.url}\tmethod: ${req.method}`);
  res.redirect("/new-page.html");
});

app.get("/*(.html)?", (req, res) => {
  console.log(`error: url: ${req.url}\tmethod: ${req.method}`);
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server is activated on localhost:${PORT} `));
