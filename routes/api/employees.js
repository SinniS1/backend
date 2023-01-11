const express = require("express");
const router = express.Router();
const path = require("path");
const { getAllEmployees, postEmployees, putEmployees, deleteEmployees, paramsEmployees } = require("../../controllers/employeesController");

router.route("/").get(getAllEmployees).post(postEmployees).put(putEmployees).delete(deleteEmployees);

router.route("/:id").get(paramsEmployees);

module.exports = router;
