// md5加密, 通常用于用户注册/登录时将密码等重要代码进行加密
const md5 = require('blueimp-md5')

// 引入生成唯一key值库, 通常用于生成新文件的名称
const nanoid = require('nanoid')
nanoid() // 生成默认长度key值
nanoid(10) // 生成指定长度key值

// 用于七牛服务器生成密匙, 发送请求的库
const qiniu = require('qiniu')

// 用于爬取网页数据的库
const puppeteer = require('puppeteer');

// 用于向其他域名发送请求的库
const axios = require('axios')

// 用于生成json-token加密与解密数据, 可用于登录或其他安全性需求较高的地方
const jwt = require('jsonwebtoken');
// 生成一个token
const token = jwt.sign(
    { foo: 'bar' }, // 储存对象
    'shhhhh', // 加密字段
    { expiresIn: 180 } // 配置对象, expiresIn为过期时间(3分钟)
);
// 解密一个token, 传入token与加密字段
const decoded = jwt.verify(token, 'shhhhh', (err)=>{
    // 如果过期, err则不为空
})