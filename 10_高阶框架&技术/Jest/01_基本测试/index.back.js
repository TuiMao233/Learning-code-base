import { baojian1, baojian2 } from "./index";
test('保健1方法-300元', ()=>{
  expect(baojian1(300)).toBe('至尊服务')
})
test('保健2方法-2000元', ()=>{
  expect(baojian2(2000)).toBe('双人服务')
})