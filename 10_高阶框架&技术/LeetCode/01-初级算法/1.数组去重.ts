const nums = [1,1,2]
function removeDuplicates (nums: number[]) {
  const newNums: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    // 如第一次赋值
    (i == 0) && (newNums[i] = nums[i]);
    for (let j = 0; j < newNums.length; j++) {
      // 使用newNums进行对比
      if (newNums[j] === nums[i]) {
        break;
      }
      // 到最后一步也不相同, 那么添加到尾部
      if (j === newNums.length - 1) {
        newNums.push(nums[i])
      }
    }
  }
  return newNums
}
console.log(removeDuplicates(nums))