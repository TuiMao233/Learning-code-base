/* 
    功能：定义一个操作数据库的库 支持Mysql Mssql MongoDB
    要求：Mysql MsSql MongoDb功能一样 都有add、update、delete、get方法
    注意：约束统一的规范、以及代码重用
    解决方案：需要约束规范所以要定义接口，需要代码重用所以要用到泛型
        1. 接口：在面向对象的编程中，接口是一种规范的定义，他定义了行为和动作的规范
        2. 泛型：泛型就是解决类 接口 方法的重用性
*/

// 定义一个操作mysql数据库的类
interface DBI<Type> {
    add(info: Type): boolean
    update(info: Type): boolean
    delete(id: number): boolean
    get(id: number): boolean
}
class MysqlDb<Type> implements DBI<Type> {
    constructor() {
        console.log('--数据库建立连接--');
    }
    add(info: Type): boolean {
        throw new Error("Method not implemented.")
    }
    update(info: Type): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): boolean {
        throw new Error("Method not implemented.")
    }
}
// 定义一个操作mssql数据库的类
class MssqlDb<Type> implements DBI<Type> {
    constructor() {
        console.log('--数据库建立连接--');
    }
    add(info: Type): boolean {
        throw new Error("Method not implemented.")
    }
    update(info: Type): boolean {
        throw new Error("Method not implemented.")
    }
    delete(id: number): boolean {
        throw new Error("Method not implemented.")
    }
    get(id: number): boolean {
        throw new Error("Method not implemented.")
    }
}

// 操作用户表 定义一个User类和数据表做映射

class User {
    username: string | undefined
    password: string | undefined
}
const u = new User()
u.username = '张山'
u.username = '123456'

const oMysql = new MysqlDb<User>()
oMysql.add(u)

const oMssql = new MssqlDb<User>()
oMssql.add(u)