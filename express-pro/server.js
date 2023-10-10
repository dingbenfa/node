// 导入 express
const express = require("express");

// 导入路由模块
const router = require("./router/index");

// 创建web服务器
const app = express(); // 绑定到app是应用中间件

// 托管静态资源  指定文件夹public
app.use(express.static("public"));
app.use("/files", express.static("download")); // 挂载路径前缀

// 使用 cors 中间件解决跨域问题
const cors = require("cors");
app.use(cors());

// 创建全局中间件
// const mw = function (req, res, next) {
//   console.log("这是一个中间件函数")
//   next(); // 中间件
// }
// // 把 mw 注册为全局中间件
// app.use(mw);

app.use((req, res, next) => {
  console.log("调用了全局中间件");
  next();
});

// 自定义中间件
// // 使用querystring 模块解析请求体数据
// const qs = require("querystring");
// app.use(function (req, res, next) {
//   let paramTempStr = "";
//   req.on("data", (param) => {
//     paramTempStr += param;
//   });
//   req.on("end", () => {
//     // console.log(paramTempStr);
//     // console.log(qs.parse(paramTempStr));
//     req.body = qs.parse(paramTempStr);
//     next();
//   });
// });

// 自定义模块
const myQs = require("./module/body-parser");
app.use(myQs);

// 导入表单解析中间件
// const parser = require("body-parser");
// app.use(parser.urlencoded({ extended: false }));

// 挂载 express.json 中间件，解析json格式表单数据
// app.use(express.json());

// 挂载 express.urlencoded 中间件，解URL-encoded 格式的请求体数据
// app.use(express.urlencoded({ extended: false }));

// 注册路由模块
// app.use(router);
app.use("/api", router); // 统一路由添加前缀

// 注意：使用 app.use() 注册中间件

//**** 监听get、post请求，并返回具体内容（挂载路由） ****// 
// app.get("/user/info", (req, res) => {
//   res.send({
//     code: 200,
//     message: "操作成功",
//     params: req.query,
//     data: {
//       name: "dingbenfa",
//       sex: "男",
//       age: 30,
//     },
//   });
// });
// app.post("/login", (req, res) => {
//   res.send({
//     code: 200,
//     message: "操作成功",
//     params: req.params,
//     data: "dfhksdhfkhsdjkfhdjshweiryeiuryeuiwryeu2324324324",
//   });
// });
// // :id动态参数
// app.get("/article/delete/:id/:name", (req, res) => {
//   console.log(req.params); // { id: XXX }
//   res.send({
//     code: 200,
//     message: "操作成功",
//     data: req.params,
//   });
// });


// 错误级别中间件，注意必须置于所有路由注册之后
app.use((err, req, res, next) => {
  console.log("发生了错误：" + err.message);
  res.send({
    code: 500,
    message: err.message,
    data: null,
  });
});


// 启动web服务器
app.listen(8089, () => {
  console.log("express app running at http://127.0.0.1:8089");
});

// 全局安装nodemon，npm i -g nodemon , 实现修改保存项目文件后服务器自动重启，热更新

// express内置中间件
// express.static 快速管静态资源的内置中间件，例如: HTML 文件、图片、CSS 样式等(无兼容性)
// express.json 解析JSON 格式的请求体数据 (有兼容性，仅在4.16.0+ 版本中可用)
// express.urlencoded 解析 URL-encoded 格式的请求体数据 (有兼容性，仅在4.16.0+ 版本中可用)