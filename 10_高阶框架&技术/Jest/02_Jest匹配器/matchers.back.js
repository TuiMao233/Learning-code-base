/*
 * @Author: Mr_Mao
 * @Date: 2020-07-19 14:17:22
 * @LastEditTime: 2020-07-28 21:11:38
 * @LastEditors: Mr_Mao
 * @佛祖保佑，永无bug
 */ 
/*
 * @Author: Mr_Mao
 * @Date: 2020-07-19 14:17:22
 * @LastEditTime: 2020-07-28 21:08:51
 * @LastEditors: Mr_Mao
 * @佛祖保佑，永无bug
 */ 
// jest 匹配器
test('严格相等', () => {
  const a = { number: '007' }
  expect(a).toBe(a) // -> 通过
})
test('内容相等', () => {
  const a = { number: '007' }
  expect(a).toEqual({ number: '007' }) // -> 通过
})
test('null匹配', () => {
  expect(null).toBeNull() // -> 通过
})
test('undefined匹配', () => {
  expect(undefined).toBeUndefined() // -> 通过
})
test('不为undefined匹配', () => {
  expect('jspang').toBeDefined() // -> 通过
})
test('为true匹配', () => {
  expect(1).toBeTruthy() // 不通过
})
test('为false匹配', () => {
  expect(0).toBeFalsy() // 通过
})


test('大于指定值的数匹配', () => {
  expect(10).toBeGreaterThan(9) // ->通过
})
test('小于指定值的数匹配', () => {
  expect(10).toBeLessThan(11) // ->通过
})
test('大于等于指定值的数匹配', () => {
  expect(10).toBeGreaterThanOrEqual(10) // ->通过
})
test('小于等于指定值的数匹配', () => {
  expect(10).toBeLessThanOrEqual(10) // ->通过
})
test('匹配浮点数结果(忽略精度存在问题)', () => {
  const one = 0.1
  const tow = 0.2
  expect(one + tow).toBeCloseTo(0.3) // ->通过
})

test('匹配字符串是否存在指定字符串', () => {
  const str = "谢大脚,刘英,小红"
  expect(str).toMatch('谢大脚')
})

test('匹配数组/Set中某个元素', () => {
  const arr = ["谢大脚", "刘英", "小红"]
  const set = new Set(arr)
  expect(arr).toContain('谢大脚') // -> 通过
  expect(set).toContain('谢大脚') // -> 通过
})

const throwNewErrorFunc = () => { throw new Error('this is Error') }
test('匹配该函数是否抛出错误',() => {
  expect(throwNewErrorFunc).toThrow() // -> 通过
  // 匹配该异常字符串是否符合
  expect(throwNewErrorFunc).toThrow('this is Error') // -> 通过
  // 匹配不存在异常(not)
  expect(throwNewErrorFunc).not.toThrow() // -> 不通过
})