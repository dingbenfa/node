const fs = require("fs");
const path = require("path");

console.log("******文件打包开始******");
fs.readFile(path.join(__dirname, "./index.html"), "utf8", function (err, dataStr) {
  if (err) return console.log("读取index.html文件失败：" + err.message);

  console.log("读取文件成功");

  buildFn().then(() => {
    return resolveCss(dataStr);
  }).then(() => {
    return resolveJs(dataStr);
  }).then(() => {
    return resolveHtml(dataStr);
  }).then(() => {
    console.log("******文件打包结束******");
  });
});

const regCss = /<style>[\s\S]*<\/style>/;
const regJS = /<script>[\s\S]*<\/script>/;

function buildFn() {
  return new Promise((resolve, reject) => {
    fs.mkdir(path.join(__dirname, './static'), { recursive: true }, function (err, path) {
      if (err) {
        console.log("创建目录失败：" + err.message);
        reject();
      } else {
        console.log("创建目录成功");
        resolve();
      }
    });
  });
}

function resolveCss(dataStr) {
  return new Promise((resolve, reject) => {
    const cssStr = regCss.exec(dataStr)[0].replace("<style>", '').replace("</style>", '');

    fs.writeFile(path.join(__dirname, './static/index.css'), cssStr, function (err, dataStr) {
      if (err) {
        console.log("写入index.css文件失败：" + err.message);
        reject();
      } else {
        console.log("写入index.css文件成功");
        resolve();
      }
    });
  });
}

function resolveJs(dataStr) {
  return new Promise((resolve, reject) => {
    const jsStr = regJS.exec(dataStr)[0].replace("<script>", '').replace("</script>", '');

    fs.writeFile(path.join(__dirname, './static/index.js'), jsStr, function (err, dataStr) {
      if (err) {
        console.log("写入index.js文件失败：" + err.message);
        reject();
      } else {
        console.log("写入index.js文件成功");
        resolve();
      }
    });
  });
}

function resolveHtml(dataStr) {
  return new Promise((resolve, reject) => {
    const htmlStr = dataStr.replace(regCss, '<link rel="stylesheet" href="./index.css" />').replace(regJS, '<script src="./index.js"></script>');

    fs.writeFile(path.join(__dirname, './static/index.html'), htmlStr, function (err, dataStr) {
      if (err) {
        console.log("写入index.html文件失败：" + err.message);
        reject();
      } else {
        console.log("写入index.html文件成功");
        resolve();
      }
    });
  });
}