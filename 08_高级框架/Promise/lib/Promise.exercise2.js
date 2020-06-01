
//! 定义状态常量
var PENDING = 'pending'
var RESOLVED = 'resolved'
var REJECTED = 'rejected'
function Promise(executor) {
    //! 初始化数据
    var _this = this
    _this.status = PENDING
    _this.data = undefined
    _this.onResolved = undefined
    _this.onRejected = undefined
    function resolve(value) {
        //! 如状态已改变，立即退出
        if (_this.status !== PENDING) { return }
        _this.data = value
        //! 初始化状态
        _this.status = RESOLVED
        if (_this.onResolved) {//! 如果已经定义值，代表可以执行回调
            setTimeout(function () { _this.onResolved(value) });
        }
    }
    function reject(reason) {
        //! 如状态已改变，立即退出
        if (_this.status !== PENDING) { return }
        _this.data = reason
        //! 初始化状态
        _this.status = REJECTED
        if (_this.onRejected) {//! 如果已经定义值，代表可以执行回调
            setTimeout(function () { _this.onRejected(reason) });
        }
    }
    try {
        executor(resolve, reject)
    } catch (error) {
        //! 如捕捉到异常，代表在回调中发现抛出错误，执行reject
        reject(error)
    }
}
Promise.prototype = {
    then: function (onResolved, onRejected) {
        var _this = this
        return new Promise(function (resolve, reject) {
            if (_this.status === RESOLVED) {
                //! 1. 已经获取到了，代表可以执行onResolved回调
                setTimeout(function () { thenReturnPromiseDealWith(onResolved) });

            } else if (_this.status === REJECTED) {
                //! 2. 获取失败了，代表可以执行onRejected回调
                setTimeout(function () { thenReturnPromiseDealWith(onRejected) });
            } else {
                //! 3. 暂时没有获取，代表不能执行回调，将回调保存至_this.onResolved/_this.onRejected
                _this.onResolved = function () { thenReturnPromiseDealWith(onResolved) }
                _this.onRejected = function () { thenReturnPromiseDealWith(onRejected) }
            }
            function thenReturnPromiseDealWith(callback) {
                //! then return Promise deal with
                try {
                    var result = callback(_this.data)
                    if (result instanceof Promise) {
                        //! 2. 执行结果是Promise，那么return Promise的状态由执行结果Promise 决定
                        result.then(resolve, reject)
                    } else {
                        //! 3. 执行结果不是Promise，执行成功函数
                        resolve(result)
                    }
                    //! 1. 执行结果是抛出错误, 代表执行失败函数
                } catch (error) { reject(error) }
            }
        })
    }
}
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(666)
    }, 1100);
}).then(
    value => {
        console.log(value)
        return new Promise(() => { })
    },
    reason => console.log(reason)
).then(
    value => console.log(value),
    reason => console.log(reason)
)