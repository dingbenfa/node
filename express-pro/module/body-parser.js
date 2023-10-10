// 自定义模块

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