//*** 路由模块化 ***// 

// 导入 express
const express = require("express");

// 创建理由对象
const router = express.Router(); // 绑定到router是路由中间件

// 创建局部中间件
const mwLogin1 = function (req, res, next) {
  console.log("调用了登录模块的局部中间件1");
  next();
};
const mwLogin2 = function (req, res, next) {
  console.log("调用了登录模块的局部中间件2");
  next();
};

// 挂载路由
router.get("/user/info", (req, res) => {
  res.send({
    code: 200,
    message: "操作成功",
    params: req.query,
    data: {
      name: "dingbenfa",
      sex: "男",
      age: 30,
    },
  });
});
// router.post("/login", mwLogin1, mwLogin2, (req, res) => {
router.post("/login", [mwLogin1, mwLogin2], (req, res) => {
  console.log(req.body); // 在默认情况下，未配置解析表单数据的中间件，req.body默认是undefined
  res.send({
    code: 200,
    message: "操作成功",
    params: req.body,
    data: "dfhksdhfkhsdjkfhdjshweiryeiuryeuiwryeu2324324324",
  });
});
// :id动态参数
router.get("/article/delete/:id/:name", (req, res) => {
  throw new Error("服务器内部发生错误")

  console.log(req.params); // { id: XXX }
  res.send({
    code: 200,
    message: "操作成功",
    data: req.params,
  });
});

// 使用中间件body-parser，解析请求体数据
router.post("/parser", (req, res) => {
  res.send({
    code: 200,
    message: "操作成功",
    params: req.body,
    data: {},
  });
});

// 导出路由模块
module.exports = router;