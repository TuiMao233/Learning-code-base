const crypto = require('crypto');
const md5 = crypto.createHash('md5');

// 生成强加密的伪随机数
const buf = crypto.randomBytes(32);
const salt = buf.toString('hex')

// 将密码拼接上任意长度的随机字符串后，再进行 Hash
let password = '123456';
md5.update(password+salt);
console.log(md5.digest('hex'));