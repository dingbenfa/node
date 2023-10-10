
## 模块化
什么是模块化
模块化是指解决一个复杂问题时，自顶向下逐层把系统划分成若干模块的过程。对于整个系统来说，模块是可组合、分解和更换的单元。

把代码进行模块化拆分的好处:
1、提高了代码的复用性
2、提高了代码的可维护性
3、可以实现按需加载

...
Node.js 中的模块化规范
Node.js 遵循了 CommonJS 模块化规范，CommonJS 规定了模块的特性和各模块之间如何相互依赖
CommonJS规定
1、每个模块内部，module 变量代表当前模块。
2、module 变量是一个对象，它的 exports 属性(即 module.exports) 是对外的接口。
3、加载某个模块，其实是加载该模块的 module.exports 属性。require() 方法用于加载模块。
...

## express框架笔记
express是基于Node.js的快速、开放、极简的web开发框架（基于node内置模块发开发的框架，类似jQuery是基于js封装的框架）

## express安装
npm i express

## express使用
// 导入 express
const express = require("express");

// 创建web服务器
const app = express();

// 托管静态资源  指定文件夹public
app.use(express.static("public"));
app.use("/files", express.static("download")); // 挂载路径前缀

// 挂载路由
app.get("/user", (req, res) => {
  res.send("操作成功！");
});

// 启动web服务器
app.listen(8089, () => {
  console.log("express app running at http://127.0.0.1:8089");
});

## 路由参数获取
get：req.query
动态参数：req.params
router.get("/article/delete/:id/:name", (req, res) => {
  console.log(req.params); // { id: XXX }
  res.send("操作成功");
});
post：req.body   // 在默认情况下，未配置解析表单数据的中间件，req.body默认是undefined

## 路由模块化 router.js
// 导入 express
const express = require("express");

// 创建理由对象
const router = express.Router(); // 绑定到router是路由中间件

// 挂载路由
router.get("/user/info", (req, res) => {
  res.send({
    code: 200,
    message: "操作成功",
    data: {},
  });
});

// 导出路由模块
module.exports = router;

#### 入口文件 app.js
// 导入路由模块
const router = require("./router");

// 注册路由模块
// app.use(router);
app.use("/api", router); // 统一路由添加前缀

## 全局中间件
// 创建全局中间件
app.use((req, res, next) => {
  console.log("调用了全局中间件");
  next();
});

## 局部中间件
const mw1 = function (req, res, next) {
  console.log("调用了登录模块的局部中间件1");
  next();
};
const mw12 = function (req, res, next) {
  console.log("调用了登录模块的局部中间件2");
  next();
};
// router.post("/user", mw1, mw12, (req, res) => {
router.post("/user", [mw1, mw2], (req, res) => {
  res.send("操作成功");
});

## 中间件分类
1、应用中间件    // 绑定到app是应用中间件
2、路由中间件    // 绑定到router是路由中间件
3、错误中间件    // 错误级别中间件，注意必须置于所有路由注册之后
4、express内置中间件
5、第三方中间件 // body-parser 解析请求体数据
6、自定义中间件

## express内置中间件
1、express.static 快速管静态资源的内置中间件，例如: HTML 文件、图片、CSS 样式等(无兼容性)
2、express.json 解析JSON 格式的请求体数据 (有兼容性，仅在4.16.0+ 版本中可用)
3、express.urlencoded 解析 URL-encoded 格式的请求体数据 (有兼容性，仅在4.16.0+ 版本中可用)

注意: Express内置的express.urlencoded 中间件，就是基于body-parser 这个第三方中间件进一步封装出来的.

## 错误中间件（必须有四个参数）
app.get("/user", (req, res) => {
  throw new Error("服务器内部发生错误")
  res.send("操作成功");
});
app.use((err, req, res, next) => {
  console.log("发生了错误：" + err.message);
  res.send({
    code: 500,
    message: err.message,
    data: null,
  });
});

## 使用querystring 模块解析请求体数据
Node.js 内置了一个 querystring 模块，专门用来处理查询字符串。通过这个模块提供的 parse0 函数，可以轻松把查询字符串，解析成对象的格式。

## 安装nodemon
全局安装nodemon，npm i -g nodemon , 实现修改保存项目文件后服务器自动重启，热更新

## 自定义中间件
// 使用querystring 模块解析请求体数据
const qs = require("querystring");
app.use(function (req, res, next) {
  let paramTempStr = "";
  req.on("data", (param) => {
    paramTempStr += param;
  });
  req.on("end", () => {
    // console.log(paramTempStr);
    // console.log(qs.parse(paramTempStr));
    req.body = qs.parse(paramTempStr);
    next();
  });
});

## 自定义模块
...模块
const qs = require("querystring");
function bodyParserFn(req, res, next) {
  let paramTempStr = "";
  req.on("data", (param) => {
    paramTempStr += param;
  });
  req.on("end", () => {
    // console.log(paramTempStr);
    // console.log(qs.parse(paramTempStr));
    req.body = qs.parse(paramTempStr);
    next();
  });
}
module.exports = bodyParserFn
...

...引用
const myQs = require("./module/body-parser");
app.use(myQs);
...

## CORS 跨域资源共享
使用 cors 中间件解决跨域问题

cors是Express的一个第三方中间件。通过安装和配置 cors 中间件，可以很方便地解决跨域问题使用步骤分为如下3步:
1、运行 npm install cors 安装中间件。
2、使用 const cors = require("cors") 导入中间件。
3、在路由之前调用 app.use(cors()) 配置中间件。

cors 相关的三个响应头
1、Access-Control-Allow-Origin    <Origin> | "*"
2、Access-Control-Allow-Headers
默认情况下，CORS 仅支持客户端向服务器发送如下的9个请求头Accept、Accept-Language、 Content-Language、 DPR、Downlink、 Save-Data、 Viewport-Width、 WidthContent-Type (值仅限于 text/plain、multipart/form-data、 application/x-www-form-urlencoded 三者之一如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败!
（1）// 允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
（2）// 注意:多个请求头之间使用英文的迈号进行分割
  res.setHeader('Access-Control-Allow-Headers','Content-Type, X-Custom-Header')
3、Access-Control-Allow-Methods  " GET,POST,HEAD"(默认) | "*"
（1）// 只允许 POST、GET、DELETE、HEAD 请求方法
  res.setHeader('Access-Control-Allow-Methods','pOST，GET，DELETE，HEAD')
（2）// 许所有的 HTTP 请求方法
  res.setHeader('Access-Control-Allow-Methods',"*')

简单请求和预检请求的区别：
简单请求的特点: 客户端与服务器之间只会生一次请求。
预检请求的特点:客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起[正的请求。