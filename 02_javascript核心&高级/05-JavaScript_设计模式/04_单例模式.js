/* 
在传统开发工程师眼里，单例就是保证一个类只有一个实例，
实现的方法一般是先判断实例存在与否，如果存在直接返回，
如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
在JavaScript里，单例作为一个命名空间提供者，
从全局命名空间里提供一个唯一的访问点来访问该对象。
*/

// 定义一个外部不可修改的单例模式
const createSingle = (function () {
  let _unique = null;
  function single () {
      return { a: 1}
  }
  return function () {
      if (_unique == null){
          _unique = single()
      }
      return _unique
  }
})()
// 创建a对象和b对象
const a = createSingle()
const b = createSingle()
console.log(a === b) // 相等