/* // 面向过程
function xiaoAEatApple(){}
function xiaoAEatFish(){}
function xiaoBEatBanana(){}
// 面向对象
function Cat (name) {
    this.name = name
}
Cat.prototype.eat = function (semething) {
    
} */

// 定义一个属性装饰器
function logProperty(params: any) {
    return function (target: any, attr: any) {
        // target --> HttpClient.prototype
        // attr --> 'url'
        console.log(target);
        console.log(attr);
        target[attr] = params
    }
}
class HttpClient {
    // 在需要装饰的属性上方调用装饰器
    @logProperty('http:itying.com')
    public url: any | undefined
    constructor() { }
    getData() { }
}
const http = new HttpClient()

console.log(http);
