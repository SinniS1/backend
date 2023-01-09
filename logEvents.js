const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, fileName) => {
  const logItem = `${format(new Date(), "ddmmyyyy\thh:mm:ss")}\t${uuid()}\t${message}\n`;
  // console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    await fsPromises.appendFile(path.join(__dirname, "logs", fileName), logItem);
  } catch (error) {
    console.error(error);
  }
};

module.exports = logEvents;
