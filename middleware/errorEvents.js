const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res) => {
  logEvents(`${err.name}\t${err.message}`, "errorLogs.txt");
  res.status(500).send(err.message);
};
module.exports = errorHandler;
