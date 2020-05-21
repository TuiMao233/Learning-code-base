//  对arr该数组进行反转操作
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// 循环半数
for (let i = 0; i < arr.length/2; i++) {
    // 记录倒数索引
    const r = arr.length - 1 - i
    // 进行交替属性值操作
    const temp = arr[i]
    arr[i] = arr[r]
    arr[r] = temp 
}
console.log(arr)