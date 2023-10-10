const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "./files/tt.txt"), "utf8", function (error, data) {
  if (error) {
    console.log("读取文件失败：" + error.message);
  } else {
    // console.log("读取文件成功：" + data);
    const dataStrArr = data.split(" ");
    const tempArr = dataStrArr.map((item) => {
      return item.replace("=", "：");
    });
    const _dataStr = tempArr.join("\r\n");

    const filePath = path.join(__dirname, "./files/tt-cs.txt")
    fs.writeFile(filePath, _dataStr, function (error, data) {
      if (error) {
        console.log("写入文件失败：" + error.message);
      } else {
        const fileName = path.basename(filePath, ".txt");
        console.log("写入文件成功！文件名为：" + fileName + ", 文件格式为："+ path.extname(filePath));
      }
    });
  }
});
