const express = require("express");
const path = require("path");
const router = express.Router();
const errorHandler = require("../middleware/errorEvents");

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/redirect(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

router.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "..", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

router.use(errorHandler);
module.exports = router;
