const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require("fs");
const path = require('path')
/* GET home page. */
router.get('/', (req, res)=> res.render('index', { title: 'Express' }));


// 文件过滤器(可选)
function fileFilter (req, file, cb) { 
  // 这个函数应该调用 `cb` 用boolean值来指示是否应接受该文件
  // file有该文件的后缀名 或者其他信息
  // 获取文件后缀名 originalname 属性是名称
  const ext = path.extname(file.originalname)
  // 接受这个文件，使用`true`，像这样:
  if(ext.match(/jpg|png/)) cb(null, true)
  // 拒绝这个文件，使用`false`，像这样:
  else cb(null, false)
}

// 初始化上传对象
router.use(multer({ fileFilter }).single('avatar'))

router.post('/upImage',async (req, res, next)=> {
  if (!req.file) return res.send({code: 1, msg: '上传失败, 指定文件不存在, 或文件格式不正确'});
  console.log(req.file);

  // 获取文件后缀名 originalname 属性是名称
  const ext = path.extname(req.file.originalname);
  if(!ext.match(/jpg|png/)) return res.send({code: 1, msg: '上传失败, 文件不是jpg或png'});
  const dir_file = path.resolve(__dirname, `../public/${Date.now()}${ext}`)
  console.log(dir_file)

  // 使用fs模块上传文件
  fs.writeFile(dir_file, req.file.buffer, {flag:'w'})
  res.send('ok')
})


module.exports = router;
