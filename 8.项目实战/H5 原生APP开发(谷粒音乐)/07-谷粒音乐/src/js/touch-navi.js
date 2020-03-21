// 构建拖拽工具包
import ReusableDrag from 'reusable-drag'

// 导航栏滑屏封装
const touchNavi = new ReusableDrag({
    data() {
        return {
            viewWidth: this.el.offsetWidth,
            varyElWidth: this.varyEl.offsetWidth,
        }
    },
    mounted() {
        // 移动块总宽-视口宽=拖动块总偏移量
        this.moveTotalOffsetLeft = this.varyElWidth - this.viewWidth
    },
    methods: {
        rubberBand() { // 导航栏超出橡皮筋回弹效果
            const endVaryElOffsetX = this.varyEl.getBoundingClientRect()['x']
            if (endVaryElOffsetX > 0) {
                // 如果超出左屏, 拉回原点
                this.varyEl.style.transform = `translateX(${0}px)`
            }
            if (-endVaryElOffsetX > this.moveTotalOffsetLeft) {
                // 如果超出右边，拉回原点
                this.varyEl.style.transform = `translateX(${-(this.moveTotalOffsetLeft)}px)`
            }
        },
        lockNum(num, leftNum, rightNum) { // 锁定值在指定区间 [leftNum, rightNum]
            if (num < leftNum) {
                num = leftNum
            }
            if (num > rightNum) {
                num = rightNum
            }
            return num
        }
    },
    touch: {
        start(ev) {
            this.varyEl.style.transition = 'none'// 在执行滑动前，关闭动画
            this.startClientX = ev['touches'][0].clientX
            this.startVaryElOffsetX = this.varyEl.getBoundingClientRect()['x']
            // 按下时,记录当前时间
            this.newTime = new Date().getTime()
            // 按下时, 重置当前拖动的像素
            this.slidingCount = 0
        },
        move(ev) {
            this.moveClientX = ev['touches'][0].clientX
            // 计算滑屏值
            this.moveX = this.moveClientX - this.startClientX + this.startVaryElOffsetX
            // 记录滑动偏移量
            this.slidingCount = this.moveClientX - this.startClientX
            /* 
            !   抽象定义橡皮筋滑动值
                橡皮筋值 [1 到 0] 之间 = 视口宽 / (视口宽 - 超出值)
                左/右橡皮筋滑动值 = 左/右滑动区间最大值 + 超出值 * 橡皮筋值
            */
            if (this.moveX > 0) { // 如果在左区间 计算左橡皮筋滑动值
                // 视口宽 / (视口宽 - 超出值) = 橡皮筋值 [1 , 0]之间
                this.rubberBandValue = this.viewWidth / ((this.viewWidth + this.moveX) * 3)
                this.moveX = 0 + this.moveX * this.rubberBandValue
            }
            if (this.moveX < -this.moveTotalOffsetLeft) { // 如果在右区间 计算右橡皮筋滑动值
                // 视口宽 / (视口宽 - 超出值) = 橡皮筋值 [1 , 0]之间
                const rightEsxceedVal = -(this.moveTotalOffsetLeft+this.moveX)
                this.rubberBandValue = this.viewWidth / ((this.viewWidth + rightEsxceedVal) * 3)
                // 拖动块总偏移量 + (超出值 * 橡皮筋值)
                this.moveX = -(this.moveTotalOffsetLeft + (rightEsxceedVal * this.rubberBandValue))
            }
            this.varyEl.style.transform = `translateX(${this.moveX}px)`
        },
        end(ev) {
            this.varyEl.style.transition = '0.3s'

            this.lastTime = new Date().getTime() 
            const timeEqu = this.lastTime - this.newTime
            // 每毫秒走了多少css像素
            const speed = Math.abs(this.slidingCount / timeEqu) 
            //! 抽象定义快速滑屏距离
            // 如果一毫秒的css像素超过0.6, 并且不在两侧 则进行快速滑屏
            if (speed > 0.5 && this.moveX < 0 && this.moveX > -this.moveTotalOffsetLeft) {
                // 过渡时间计算 速度*0.2 当速度越快时, 时间越短
                this.varyEl.style.transition = 0.3 / speed +'s'
                // 计算快速滑屏距离(滑冰距离)
                this.moveX = this.moveX + speed * this.slidingCount
                // 锁定快速滑屏距离在 [-移动块总宽-100, 100] 之间
                this.moveX = this.lockNum(this.moveX, -this.moveTotalOffsetLeft, 0)
                this.varyEl.style.transform = `translateX(${this.moveX}px)`
            }
            this.rubberBand()
        }
    }
})

export default touchNavi