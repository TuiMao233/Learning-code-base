// type 关键字定义任意类型
namespace AnyType {
  type my_type = string | number
  const key: my_type = 60
}
// type 关键字定义泛型类型
namespace GenerictyType {
  type my_type = Promise<string>
  const result: my_type = new Promise(resolve => {
    resolve("string")
  })
}
// type 关键字定义
namespace KeyOfType {
  const tx: any = {}
  console.log(tx instanceof tx)
}