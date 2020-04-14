import  './www'
const attr = (num) => {
  return new Promise((resolve, reject) => {
    if (num > 10) {
      resolve({
        num,
        msg: '当前num大于10'
      });
    } else {
      reject({
        num,
        msg: '当前num小于10'
      });
    }
  });
};