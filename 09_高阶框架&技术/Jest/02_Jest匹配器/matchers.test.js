test('测试严格相等',()=>{
  const a = {number:'007'}   
  expect(a).toBe(a) // -> 通过?
}) 
test('测试内容相等',()=>{
  const a = {number:'007'}   
  expect(a).toEqual({number:'007'}) // -> 通过
})
test('测试null匹配',()=>{
  const a = null   
  expect(a).toBeNull() // -> 通过
}) 
test('测试undefined匹配',()=>{
  const a = undefined   
  expect(a).toBeUndefined() // -> 通过
}) 
test('测试不为undefined匹配',()=>{
  const a = 'jspang'  
  expect(a).toBeDefined() // -> 通过
}) 
test('测试为true匹配',()=>{
  const a = 1
  expect(a).toBeTruthy() // 不通过
}) 
test('测试为false匹配',()=>{
  const a = 0
  expect(a).toBeFalsy() // 通过
})