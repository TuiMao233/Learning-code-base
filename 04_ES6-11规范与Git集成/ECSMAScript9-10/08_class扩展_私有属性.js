class Person {
  // 公有属性
  name;
  // 私有属性
  #age;
  #weight;
  // 构造方法
  constructor(name, age, weight) {
    this.name = name
    this.#age = age
    this.#weight = weight
  }
  intro() {
    console.log(this.#age) // 18
    console.log(this.#weight) // 45kg
  }
}

const p = new Person('陈长春', 18, '45kg')
// console.log(p) // { name: '陈长春' }
console.log(p.name) // 陈长春
console.log(p.age) // undefined
console.log(p.weight) // undefined

p.intro()
