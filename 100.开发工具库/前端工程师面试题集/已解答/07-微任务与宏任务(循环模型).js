/*
 company: shangguigu
 author: yanzhiyong
 content: 宏任务和微任务
*/

/*
* 宏任务
*   分类： setTimeout setInterval requrestAnimationFrame
*   1. 宏任务所处的队列就是宏任务队列
*   2. 第一个宏任务队列中只有一个任务： 执行主线程的js代码
*   3. 宏任务队列可以有多个
*   4. 当宏任务队列的中的任务全部执行完以后会查看是否有微任务队列如果有先执行微任务队列中的所有任务，如果没有就查看是否有宏任务队列
*
* 微任务
*   分类： new Promise().then(回调) process.nextTick
*   1. 微任务所处的队列就是微任务队列
*   2. 只有一个微任务队列
*   3. 在上一个宏任务队列执行完毕后如果有微任务队列就会执行微任务队列中的所有任务
* */



console.log('----------------- start -----------------');
setTimeout(() => console.log('setTimeout'), 0)
new Promise((resolve, reject) =>{
  for (var i = 0; i < 5; i++) { console.log(i); }
  resolve()
}).then(() => {
  console.log('promise实例成功回调执行');
})
console.log('----------------- end -----------------');