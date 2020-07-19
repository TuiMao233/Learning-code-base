function baojian1(money) {
  return money >= 200 ? '至尊服务' : '基本按摩'
}
function baojian2(money) {
  return money >= 1000 ? '双人服务' : '单人服务'
}

module.exports = {
  baojian1, baojian2
}