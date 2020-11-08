// 读取数据, 返回一个Uint8Array
const data = Deno.readFileSync("./files/hello.txt")
// 创建文本解析器, 并读取文件
const decoder = new TextDecoder("utf-8")
console.log(decoder.decode(data))