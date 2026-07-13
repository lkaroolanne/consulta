const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.FRONTEND_PORT || 8080;
const HOST = process.env.FRONTEND_HOST || "0.0.0.0";
const ROOT = __dirname;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  const safePath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.join(ROOT, safePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(content);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Frontend rodando em http://${HOST}:${PORT}`);
});
