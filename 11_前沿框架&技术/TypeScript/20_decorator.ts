// 普通装饰器(无法传参)
namespace A {
    // 定义一个装饰器
    function logClass(params: any) {
        console.log(params);
        // params 就是当前类
        params.prototype.apiUrl = 'xxx';
        params.prototype.run = function () {
            console.log('--我是run方法--');
        }
    }

    @logClass // 对该构造函数使用装饰器
    class HttpClient {
        // 添加动态签名
        [x: string]: any;
        constructor() { }
        getData() { }
    }
    const http = new HttpClient()
    console.log(http.apiUrl);
}
// 装饰器工厂(可传参)
namespace B {
    // 定义一个装饰器
    function logClass(params: string) {

        return function (target: any) {
            console.log(target);
            // target 就是当前类
            target.prototype.apiUrl = 'xxx';
            target.prototype.run = function () {
                console.log('--我是run方法--');
            }
        }
    }
    @logClass('hello') // 对该构造函数使用装饰器
    class HttpClient {
        // 添加动态签名
        [x: string]: any;
        constructor() { }
        getData() { }
    }
    const http = new HttpClient()
    console.log(http.apiUrl);
}
// 重载构造函数
namespace C {
    function logClass(target: any) {
        // 继承原类, 重载类中的属性与方法
        return class extends target {
            apiUrl: any = '我是修改后的数据';
            getData() { console.log(this.apiUrl); }
        }
    }
    @logClass
    class HttpClient {
        apiUrl: string | undefined
        constructor() { this.apiUrl = '我是构造函数里面的apiUrl' }
        getData() { console.log(this.apiUrl); }
    }
    const http = new HttpClient()
    console.log(http.apiUrl);
}
// 属性装饰器
namespace D {
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
        @logProperty('http:itying.com')
        public url: any | undefined
        constructor() { }
        getData() { }
    }
    const http = new HttpClient()
}
// 方法装饰器
namespace E {
    function get(params: any) {
        /** 方法装饰器
         * @param {string} target  HttpClient.prototype-->方法的原型对象
         * @param {string} methodName  成员的名称
         * @param {object} desc  成员方法的描述信息
         */
        return function (target: any, methodName: any, desc: any) {
            // 方法描述器具备类描述器特征, 可以添加, 修改类
            target.apiUrl = 'xxx'
            target.run = () => console.log('run');

            // 保存旧方法
            const oldMethod = desc.value
            // 对方法参数进行封装, 强制转换为String
            desc.value = function (...args: any[]) {
                return args.map(item => String(item))
                // 执行方法
                oldMethod.apply(this, args)
            }
        }
    }
    class HttpClient {
        public url: any | undefined
        // 在需要装饰的函数上方添加装饰器
        @get('http://www.itying.com')
        getData(...args: any[]) { console.log('我是getdata方法', args) }
    }
    const http = new HttpClient()
    http.getData(123, 123, 123)
}
// 方法参数装饰器
namespace F {
    function logParams(params: any) {
        /** 方法装饰器
         * @param {string} target  HttpClient.prototype-->方法的原型对象
         * @param {string} methodName  方法名称
         * @param {object} paramsIndex  参数当前的索引
         */
        return function (target: any, methodName: any, paramsIndex: any) {
            // 方法参数描述器具备类描述器特征, 可以添加, 修改类
            target.apiUrl = 'xxx'
            target.run = () => console.log('run');
        }
    }
    class HttpClient {
        public url: any | undefined
        // 在需要装饰的函数上方添加装饰器
        getData(@logParams('xxx') uuid: any) {
            console.log('我是getdata方法', uuid)
        }
    }
    const http = new HttpClient()
}