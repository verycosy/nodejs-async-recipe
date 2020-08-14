const http = require("http");
const routes = require("./routes");
// const asyncModule = require("./asyncModule");
const asyncModule = require("./asyncModuleWrapper");

asyncModule.initialize(() => {
  console.log("Async module initialized");
});

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/say") {
      return routes.say(req, res);
    }

    res.writeHead(200);
    res.end("Not found");
  })
  .listen(8000);
