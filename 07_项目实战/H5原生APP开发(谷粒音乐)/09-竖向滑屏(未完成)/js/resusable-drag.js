//! 拖拽/滑屏构建工具
class reusableDrag {
    units = {// 通用工具方法库
        forIn(object, callback) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    callback(key, object)
                }
            }
        },
        thisBind(_this, object) { // 对象添加另一个对象的key:val
            if (typeof object === 'object') {
                this.forIn(object, (key, obj) => {
                    if (typeof obj[key] === 'function') {
                        _this[key] = obj[key].bind(_this)
                    } else {
                        !_this[key] && (_this[key] = obj[key])
                    }

                })
            }
        },
        objectFunThisBind(_this, object) { //对象方法绑定this
            if(typeof object === 'object'){
                this.forIn(object, (key, obj)=>{
                    if(typeof obj[key] === 'function'){
                        obj[key] = obj[key].bind(_this)
                    }
                })
            }
        },
        browserRedirect() {//! 判断浏览器类型
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return 'mobile'
            } else {
                return 'pc'
            }
        },
    }
    constructor(options) { this.options = options }
    delayConstructor(options) {// 自定义构建器
        typeof options.data === 'function' && this.units.thisBind(this, options.data.call(this))
        typeof options.methods === 'object' && this.units.thisBind(this, options.methods)
        typeof options.touch === 'object' && (this.touch = options.touch)
        typeof options.mouse === 'object' && (this.mouse = options.mouse)
        typeof options.mounted === 'function' && options.mounted.call(this)
        this.units.objectFunThisBind(this, this.touchBuilder)
    }
    create(options) { // 生成器
        const device = this.units.browserRedirect() // 获取设备类型
        this.units.thisBind(this, options)   // 生成器数据保存
        this.delayConstructor(this.options) // 执行延迟构建器
        if (device === 'pc') {// 如果设备是pc 添加mouse事件
            if (typeof this.mouse === 'object') {
                const { down, move, up } = this.mouseBuilder
                if(typeof this.mouse.down === 'function'){
                    this.el.onmousedown = down.bind(this)
                }
                if(typeof this.mouse.move === 'function'){
                    this.el.onmousemove = move.bind(this)
                }
                if(typeof this.mouse.up === 'function'){
                    this.el.onmouseup = up.bind(this)
                }
            }
        } else if (device === 'mobile') {// 如果设备是mobile 添加touch事件
            if (typeof this.touch === 'object') {
                if (typeof this.touch.start === 'function') {
                    this.el.addEventListener('touchstart', this.touchBuilder.start)
                }
                if (typeof this.touch.move === 'function') {
                    this.el.addEventListener('touchmove', this.touchBuilder.move)
                }
                if (typeof this.touch.end === 'function') {
                    this.el.addEventListener('touchend', this.touchBuilder.end)
                }
            }
        }
    }
    touchBuilder = { // touch事件构建器, 添加钩子事件
        start(ev) {
            ev = ev || window.event
            this.touch.start.call(this, ev)
        },
        move(ev) {
            ev = ev || window.event
            this.touch.move.call(this, ev)
        },
        end(ev) {
            ev = ev || window.event
            this.touch.end.call(this, ev)
        }
    }
    mouseBuilder = { // mouse事件构建器, 添加钩子事件
        down(ev) {
            ev = ev || window.event
            this.mouse.down.call(this, ev)
        },
        move(ev) {
            ev = ev || window.event
            this.mouse.move.call(this, ev)
        },
        up() {
            ev = ev || window.event
            this.mouse.up.call(this, ev)
        }
    }
    delete (){ // 卸除拖拽事件
        if(typeof this.touch === 'object'){
            this.el.removeEventListener('touchstart', this.touchBuilder.start)
            this.el.removeEventListener('touchmove', this.touchBuilder.move)
            this.el.removeEventListener('touchend', this.touchBuilder.end)
        }
        this.timer && clearInterval(this.timer)
        this.options.delete && this.options.delete.call(this)
    }
}

/*!
    滑屏事件ev封装?
    滑屏事件钩子?
 */