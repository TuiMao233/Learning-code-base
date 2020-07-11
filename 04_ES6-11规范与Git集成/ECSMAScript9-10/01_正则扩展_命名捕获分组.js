// 原生匿名捕获(不能知道具体参数具体作用)
const toLocalDate = date => date.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
console.log(toLocalDate('30-10-2019')) // -> 10-30-2019

// ES8中的命名捕获(在捕获时能清除的知道参数对应是什么)
const toLocalDate = date => date.replace(/(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/, "$<day>-$<month>-$<year>");
console.log(toLocalDate('30-10-2019')) // -> 10-30-2019

// 在match或exec中使用将返回一个对象, 命名对应值
const date = "04-25-2017".match(/(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/).groups
const { month, day, year } = date