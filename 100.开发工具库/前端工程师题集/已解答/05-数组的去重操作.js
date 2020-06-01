const oldArr = [8, 11, 20, 5, 20, 8, 0, 2, 4, 0, 8];

const newArr = []
for (let i = 0; i < oldArr.length; i++) {
    // 如果是第一次, 进行初次赋值
    if (i === 0) { newArr[i] = oldArr[i] }
    // 嵌套循环进行比较操作
    for (let j = 0; j < newArr.length; j++) {
        // 如果值相同, 跳出当前循环
        if (newArr[j] === oldArr[i]) { break; }
        // 如果执行到最后一个循环, 代表新数组不包含旧数组的该元素, 进行添加
        if (j === newArr.length - 1) { newArr.push(oldArr[i]) }
    }
}
console.log(newArr)