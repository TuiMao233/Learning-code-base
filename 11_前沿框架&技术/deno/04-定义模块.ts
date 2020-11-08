// deno 支持ES6模块化, 可直接使用export暴露模块
const math = {
  add(a: number, b: number) {
    console.log(a + b);
  },
  mul(a: number, b: number) {
    console.log(a * b);
  }
}

export default math