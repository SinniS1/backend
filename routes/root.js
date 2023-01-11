const express = require("express");
const path = require("path");
const router = express.Router();
const errorHandler = require("../middleware/errorEvents");

router.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
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
