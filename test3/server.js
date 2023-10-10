const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer();

server.on("request", (req, res) => {
  // req 请求对象    res 响应对象

  // 解决中文乱码问题
  res.setHeader("Content-Type", "text/html;charset=utf-8");

  const url = req.url;
  resolveHTML(url).then((data) => {
    res.end(data);
  }).catch((error) => {
    res.end(error);
  });

  // let content = "<h1>404 Not Found</h1>";
  // if (url === "/" || url === "/index.html") {
  //   // content = "<h1>首页</h1>";
  //   getIndexHTMK().then((data) => {
  //     res.end(data);
  //   }).catch((error) => {
  //     res.end(error);
  //   });
  // } else if (url === "/about.html") {
  //   content = "<h1>介绍页</h1>";
  //   res.end(content);
  // }else{
  //   res.end(content);
  // }
});

server.listen(8089, () => {
  console.log("服务器启动成功，http://127.0.0.1:8089");
});

function resolveHTML(url) {
  return new Promise((resolve, reject) => {
    let fpath = url;
    if (url === "/") fpath = "./index.html";
    fs.readFile(path.join(__dirname, fpath), 'utf-8', (err, dataStr) => {
      if (err) reject("<h1>404 Not Found</h1>");
      resolve(dataStr);
    });
  });
}