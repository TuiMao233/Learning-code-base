/*
 * @Author: Mr_Mao
 * @Date: 2020-07-23 21:19:05
 * @LastEditTime: 2020-07-28 21:25:43
 * @LastEditors: Mr_Mao
 * @佛祖保佑，永无bug
 */
import NewBaoJian from './newBaoJian'
const baojian = new NewBaoJian()
describe('大脚相关服务', () => {
  test('测试 大脚足疗 方法', () => {
    baojian.gongzhu(1)
    baojian.anjiao()
    expect(baojian.fuwu).toEqual('大脚走进房间为你足疗')
  })
  test('测试 大脚泰式保健 方法', () => {
    baojian.gongzhu(1)
    baojian.taishi()
    expect(baojian.fuwu).toEqual('大脚走进房间为你_泰式保健')
  })
})
describe('刘英相关服务', () => {
  test('测试 刘英按摩 方法', () => {
    baojian.gongzhu(2)
    baojian.anmo()
    expect(baojian.fuwu).toEqual('刘英走进房间为你按摩')
  })
  test('测试 刘英宫廷御疗 方法', () => {
    baojian.gongzhu(2)
    baojian.gongting()
    expect(baojian.fuwu).toEqual('刘英走进房间为你_宫廷御疗')
  })
})


