import { pmsFetchData, fetchThreeData } from "./fetchData";

test('异步方法测试', done => {
  // promise需返回, 且done要放在请求完毕后
  return pmsFetchData().then(data => {
    expect(data).toEqual({
      success: true
    })
    // done代表所有操作已完成
    done()
  })
})

test('async异步方法测试', async done => {
  // promise需返回, 且done要放在请求完毕后
  const data = await pmsFetchData();
  expect(data).toEqual({
    success: true
  });
  // done代表所有操作已完成
  done();
})


test('异步404错误测试', done => {
  expect.assertions(1) // 断言, 必须执行一次expect(不然则不通过)
  // promise需返回, 且done要放在请求完毕后
  return fetchThreeData().catch(err => {
    expect(err.toString().indexOf('404') > -1).toBe(true)
    // done代表所有操作已完成
    done()
  })
})