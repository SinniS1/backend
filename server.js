const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
const { da } = require("date-fns/locale");
class Emitter extends EventEmitter {}
const myEmitter = new Emitter();
myEmitter.on("log", (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 3500;
// function to serve the request
const serveFile = async (filePath, contentType, Response) => {
  try {
    const rawData = await fs.promises.readFile(filePath, !contentType === "image" ? "utf8" : "");
    const data = contentType === "application/json" ? JSON.parse(rawData) : rawData;
    Response.writeHead(filePath.includes("404.html") ? 404 : 200, { "Content-Type": contentType });
    Response.end(contentType === "application/json" ? JSON.stringify(data) : data);
  } catch (error) {
    myEmitter.emit("log", `${error.name}:\t${error.message}`, "errorLog.txt");
    console.log(error);
    Response.statusCode = 500;
    Response.end();
  }
};

const server = http.createServer((req, res) => {
  myEmitter.emit("log", `${req.url}\t${req.method}`, "eventLogs.txt");

  console.log(`url: ${req.url}`, `method:${req.method}`);
  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // makes .html extension not required in the browser
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    serveFile(filePath, contentType, res);
  } else {
    // 404
    // 301 redirect
    console.log(path.parse(filePath));
    switch (path.parse(filePath).base) {
      case "redirect.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);

        break;
    }
  }
});

server.listen(PORT, () => console.log(`Server is activated on localhost:${PORT} `));
