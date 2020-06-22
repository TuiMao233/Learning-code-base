"use strict";

require("core-js/modules/es.promise");

require("./www");

const attr = function attr(num) {
  return new Promise(function (resolve, reject) {
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