/*
 * @Author: Mr_Mao
 * @Date: 2020-07-23 21:19:05
 * @LastEditTime: 2020-07-25 11:24:51
 * @LastEditors: Mr_Mao
 * @佛祖保佑，永无bug
 */ 
import NewBaoJian from './newBaoJian'
const baojian = new NewBaoJian()

// beforeAll: 测试案例执行之前
beforeAll(()=>{
  console.log('beforeAll: 吃完饭后，走进了红浪漫区域')
})
// afterAll: 测试案例执行之后
afterAll(()=>{
  console.log('afterAll: 有钱人的生活就是这么枯燥且乏味')
})
// beforeEach: 每个测试用例执行前
beforeEach(()=>{
  console.log('beforeEach: 给了300元后')
})
// afterEach: 每个测试用例之后
afterEach(()=>{
  console.log('afterEach: 完成后, 我心满意足的坐在沙发上')
})
test('测试 大脚足疗 方法', ()=>{
  baojian.gongzhu(1)
  baojian.anjiao()
  console.log(baojian.fuwu)
  expect(baojian.fuwu).toEqual('大脚走进房间为你足疗')
})

test('测试 刘英按摩 方法', ()=>{
  baojian.gongzhu(2)
  baojian.anmo()
  console.log(baojian.fuwu)
  expect(baojian.fuwu).toEqual('刘英走进房间为你按摩')
})