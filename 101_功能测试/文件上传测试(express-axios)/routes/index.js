const express = require('express');
const router = express.Router();
const multer = require('multer')
const fs = require("fs");
const path = require('path')
/* GET home page. */
router.get('/', (req, res)=> res.render('index', { title: 'Express' }));



// 初始化上传对象
router.use(multer().single('avatar'))

router.post('/upImage',async (req, res, next)=> {
  if (!req.file) return res.send({code: 1, msg: '上传失败, 指定文件不存在, 或文件格式不正确'});

  // 获取文件后缀名 originalname 属性是名称
  const ext = path.extname(req.file.originalname);
  if(!ext.match(/jpg|png/)) return res.send({code: 1, msg: '上传失败, 文件不是jpg或png'});
  const dir_file = path.resolve(__dirname, `../public/${Date.now()}${ext}`)
  console.log(dir_file)

  // 使用fs模块上传文件
  fs.writeFileSync(dir_file, req.file.buffer, {flag:'w'})
  res.send({code: 0, msg: '文件上传成功'})
})


module.exports = router;
