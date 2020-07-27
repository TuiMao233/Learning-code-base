/*
 * @Author: Mr_Mao
 * @Date: 2020-07-23 21:19:05
 * @LastEditTime: 2020-07-25 11:49:45
 * @LastEditors: Mr_Mao
 * @佛祖保佑，永无bug
 */
/* 
钩子函数在父级分组可作用域子集，类似继承
钩子函数同级分组作用域互不干扰，各起作用
先执行外部的钩子函数，在执行内部的钩子函数
*/
import NewBaoJian from './newBaoJian'
const baojian = new NewBaoJian()
/* 
// beforeAll: 测试案例执行之前
beforeAll(() => {
  console.log('beforeAll: 吃完饭后，走进了红浪漫区域')
})
// afterAll: 测试案例执行之后
afterAll(() => {
  console.log('afterAll: 有钱人的生活就是这么枯燥且乏味')
}) 
*/
/* 
// beforeEach: 每个测试用例执行前
beforeEach(() => {
  console.log('beforeEach: 给了300元后')
})
// afterEach: 每个测试用例之后
afterEach(() => {
  console.log('afterEach: 完成后, 我心满意足的坐在沙发上')
}) 
*/
describe('洗脚城服务', () => {

  describe('大脚相关服务', () => {
    beforeAll(() => {
      console.log('然后走进了666号房')
    })
    afterEach(() => {
      console.log('----大脚，你服务的很好，给你30元小费')
    })
    // 只执行该测试用例
    test.only('测试 大脚足疗 方法', () => {
      baojian.gongzhu(1)
      baojian.anjiao()
      // console.log(baojian.fuwu)
      expect(baojian.fuwu).toEqual('大脚走进房间为你足疗')
    })
    test('测试 大脚泰式保健 方法', () => {
      baojian.gongzhu(1)
      baojian.taishi()
      // console.log(baojian.fuwu)
      expect(baojian.fuwu).toEqual('大脚走进房间为你_泰式保健')
    })
  })

  describe('刘英相关服务', () => {
    afterEach(() => {
      console.log('----刘英，你服务的很好，给你50元小费')
    })
    test('测试 刘英按摩 方法', () => {
      baojian.gongzhu(2)
      baojian.anmo()
      // console.log(baojian.fuwu)
      expect(baojian.fuwu).toEqual('刘英走进房间为你按摩')
    })
    test('测试 刘英宫廷御疗 方法', () => {
      baojian.gongzhu(2)
      baojian.gongting()
      // console.log(baojian.fuwu)
      expect(baojian.fuwu).toEqual('刘英走进房间为你_宫廷御疗')
    })
  })
})


