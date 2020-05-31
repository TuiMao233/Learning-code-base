// 将数组进行降序操作（不可使用sort）
const arr = [32,4,67,82,21,11]; // --> 4, 11, 21, 32, 67, 82
// 数组升序
for (let i = 0; i < arr.length; i++) {
    // 一次循环, 遍历数组每个值
    for (let j = 0; j < arr.length; j++) {
        // 二次循环, 比较当前值与其他值
        if(arr[i] < arr[j]){
            // 进入判断, 是否大于比较值
            // 元素进行交换操作
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
}
console.log(arr)


const arr2 = [32,4,67,82,21,11];
console.log(arr2.sort((a,b)=> a - b))