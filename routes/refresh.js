const express = require("express");
const router = express.Router();
const refrshTokenController = require("../controllers/refreshTokenController");

router.get("/", refrshTokenController);
module.exports = router;
