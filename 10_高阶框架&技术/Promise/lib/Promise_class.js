(function(window){
    //! 定义常用常量
    //? 未获取, 代表当前promise的resolve是异步完成的
    const PENDING = 'pending'
    //? 已获取, 代表当前promise是同步执行的
    const RESOLVED = 'resolved'
    //? 失败, 代表当前promise的执行结果为失败
    const REJECTED = 'rejected'
    //! 三种状态只能从pending中更改一次
    class Promise {
        //! constructor 构造器
        constructor(executor) {
            const _this = this
            //! Promise构造函数定义初始化状态为 未获取状态
            _this.status = PENDING
            //! Promise构造函数定义初始化数据为undefined
            _this.data = undefined
            //! Promise构造函数定义初始化成功容器为undefined
            _this.onResolved = undefined
            //! Promise构造函数定义初始化失败容器为undefined
            _this.onRejected = undefined
            //! 获取成功函数
            function resolve(value) {
                //! 如果状态不是pending, 则直接返回
                if (_this.status !== PENDING) { return }
                //! 将状态更改为获取成功
                _this.status = RESOLVED
                //! 将数据保存
                _this.data = value
                //! 如果成功函数已经定义, 代表需要异步执行成功回调 onResolved 并传入数据
                if (_this.onResolved) {
                    setTimeout(() => _this.onResolved(value));
                }
            }
            //! 获取失败函数
            function reject(reason) {
                //! 如果状态不是pending, 则直接返回
                if (_this.status !== PENDING) { return }
                //! 将状态更改为获取失败
                _this.status = REJECTED
                //! 将数据保存
                _this.data = reason
                //! 如果失败函数已经定义, 代表需要异步执行失败回调 onResolved 并传入数据
                if (_this.onRejected) {
                    setTimeout(() => _this.onRejected(reason));
                }
            }
            try {
                executor(resolve, reject)
            } catch (error) {
                //! 如果捕获到错误 则代表then retrun promise的结果为失败
                //! 那么直接调用retrun promise的失败函数, 向下传递失败
                reject(error)
            }
        }
        //! 实例方法
        then(onResolved, onRejected) {
            //! onResolved 成功回调; onRejected 失败回调;
            const _this = this
            //! 当执行then, 返回一个新的promise
            //! return promise的执行结果由onResolved, onRejected决定
            return new Promise((resolve, reject) => {
                /* 
                !   ----->数据获取有三种情况会发生
                !   数据已经获取成功, 代表可以直接执行并获取到onResolved返回值
                !   数据获取失败, 代表可以直接执行并获取到onRejected返回值
                !   数据并没有获取, 代表onRejected,onResolved并不能马上执行, 要存入实例当中由执行器的回调函数执行
                !   ----->并且每一种状态都得是异步执行
                */
                if (_this.status === RESOLVED) {
                    //! 数据获取成功, 执行return promise状态处理函数, 并传入成功回调
                    setTimeout(() => DealWithThenReturnPromise(onResolved));
                } else if (this.status === REJECTED) {
                    //! 数据获取失败, 执行return promise状态处理函数, 并传入失败回调
                    setTimeout(() => DealWithThenReturnPromise(onRejected));
                } else {
                    //! 数据暂未获取, 封装成功/失败函数, 在封装函数内执行return promise状态处理函数, 并传入then成功/失败回调,
                    //! 这个封装函数最终由当前promise实例的成功/回调函数执行
                    //! 当获取数据的时候, 会在DealWithThenReturnPromise函数中获取
                    _this.onResolved = value => DealWithThenReturnPromise(onResolved)
                    _this.onRejected = reason => DealWithThenReturnPromise(onRejected)
                }
                //! 定义处理return promise 函数, 传入要处理的成功|失败函数
                function DealWithThenReturnPromise(callback) {
                    /* 
                    !   onResolved, onRejected 有三种结果情况来改变return pormise的状态
                    !   执行结果是异常抛出, 执行return promise的失败函数, 并传入异常数据
                    !   执行结果是promise实例, 执行return promise是否调用成功/失败函数, 由执行结果的promise的结果决定
                    !   执行结果不是promise实例, 执行return promise的成功函数, 并传入执行结果
                    */
                    try {
                        //! 将then成功/失败返回值保存
                        const result = callback(_this.data)
                        if (result instanceof Promise) {
                            //! 执行结果是promise实例, 由执行结果promise实例决定return promise的执行结果
                            //! 易懂写法 result.then(value=> resolve(value), reason=> reject(reason))
    
                            //! 简便写法
                            result.then(resolve, reject)
                            //! 这里将return promise的成功/失败回调传入执行结果实例then中, 所以这里的resolve有双层意义, 
                            //! 一是结果实例then的onResolved与onRejected, 
                            //! 二是return promise的resolve与reject
                        } else {
                            //! 执行结果不是promise实例, 执行return promise成功函数, 传入执行结果
                            resolve(result)
                        }
                    } catch (error) {
                        //! 执行结果是异常抛出, 捕获异常并执行 return promise 失败函数, 传入异常
                        reject(error)
                    }
                }
    
            })
        }
        catch(reject) { return this.then(null, reject) }
        //! static 定义class静态方法
        static resolve (value){
            /* 
            ! Promise.resolve接收有三种参数
            ! 1.实例结果是失败的
            ! 2.实例结果是成功的
            ! 3.不是实例
            */
            return new Promise((resolve,reject)=>{
                if(value instanceof Promise){
                    //! 如果value是Promise的实例
                    value.then(resolve, reject)
                }else{
                    //! 如果不是
                    resolve(value)
                }
            })
            
        }
        static reject (reason){
            return new Promise((resolve,reject)=>{
                reject(reason)
            })
        }
        static all (promises){
            //! 创建一个计数器
            let resolveCount = 0
            //! 创建数组指定长度
            const values = new Array(promises.length)
            return new Promise((resolve, reject)=>{
                promises.forEach((item, index) => {
                    Promise.resolve(item).then(
                        value => {
                            //! 当获取成功时, 计数器+1
                            resolveCount ++
                            //! promise实例成功, 将结果保存在数组
                            values[index] = value
                            //! 当执行到最后一个, 执行all return promise成功函数, 传入成功值的数组
                            promises.length === resolveCount ? resolve(values) : []
                        },
                        //! 只要有一个失败, 那么就all返回的promise就是失败
                        reason => reject(reason)
                    )
                })
            })
        }
        static rule (promises){
            return new Promise((resolve, reject)=>{
                promises.forEach(item => {
                    Promise.resolve(item).then(resolve,reject)
                })
            })
        }
        //! 自定义promise
        static resolveDelay (value, time){
            //! 延迟成功
            return new Promise((resolve,reject)=>{
                setTimeout(() => {
                    if(value instanceof Promise){
                        //! 如果value是Promise的实例
                        value.then(resolve, reject)
                    }else{
                        //! 如果不是
                        resolve(value)
                    }
                }, time);
            })
        }
        static rejectDelay (reason, time){
            return new Promise((resolve,reject)=>{
                setTimeout(() => reject(reason), time);
                
            })
        }
    }
    window.Promise = Promise
})(window)