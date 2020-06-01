// 构建拖拽工具包
import ReusableDrag from 'reusable-drag'
// 页面Y轴滚动事件
const touchScrollY = new ReusableDrag({
    data() {
        return {
            viewHeight: this.el.offsetHeight,
            varyElHeight: this.varyEl.offsetHeight
        }
    },
    mounted() {
        this.headNextPart = document.querySelector('.next_part')
        this.el.addEventListener("scroll", ()=>{
            if(this.headNextPart){
                this.headNextPart.style.display = this.el.scrollTop > 200 ? 'none' : 'block'
            }
        })
    },
    methods: {
        rubberBand() { // 导航栏超出橡皮筋回弹效果
            if(this.moveY !==0){
                this.el.style.transition = '0.3s'
                this.el.style.transform = `translateY(0px)`
            }
        },
        isBottomScroll () {
            return this.el.scrollHeight - this.el.scrollTop <= this.el.clientHeight +20
        }
    },
    touch: {
        start(ev) {
            this.el.style.transition = 'none'
            this.startOffsetX = this.el.getBoundingClientRect()['y']
            // 保存按下X/Y偏移量
            this.startClientX = ev.touches[0].clientX
            this.startClientY = ev.touches[0].clientY
            // 抖动方向判断初始值
            this.isShakeX = false
            this.isShakeY = false
            // 初始Y轴拖动值
            this.slidingCountY = 0
            this.overVal = 0
            
        },
        move(ev) {
            // 获取判断滑动值 
            this.slidingCountX = ev.touches[0].clientX - this.startClientX
            this.slidingCountY = ev.touches[0].clientY - this.startClientY
            //如果Y/X轴抖动，则直接返回 (防抖动)
            if (this.isShakeX) { return }
            if (this.isShakeY === this.isShakeX) {
                // 一次性逻辑, 判断抖动方向
                this.isShakeX = Math.abs(this.slidingCountY) < Math.abs(this.slidingCountX)
                this.isShakeY = Math.abs(this.slidingCountY) > Math.abs(this.slidingCountX)
                return
            }
            
            // 执行橡皮筋计算
            // 当滚动条到头了, 并且向上滑
            if(this.el.scrollTop <= 0 && this.slidingCountY > 0){
                // 定义未到同步的超出值, 这个值是当没有在头部却拉到头部上去时的值
                this.overVal = this.overVal === 0 ? this.slidingCountY : this.overVal
                // 超出值 减去 未到同步的超出值 = 头部超出值
                this.slidingCountY = this.slidingCountY - this.overVal
                this.rubberBandVal = this.viewHeight / ((this.viewHeight+ this.slidingCountY)*2)
                const moveY = this.slidingCountY * this.rubberBandVal
                this.el.style.transform = `translateY(${moveY}px)`
            }
            // 当滚动条到底了, 并且向下滑时
            if(this.isBottomScroll() && this.slidingCountY < 0) {
                this.overVal = this.overVal === 0 ? this.slidingCountY : this.overVal
                // 超出值 减去 未到底部的超出值 = 底部超出值
                this.slidingCountY = this.slidingCountY - this.overVal
                this.rubberBandVal = this.viewHeight / ((this.viewHeight+ -this.slidingCountY)*2)
                const moveY = this.slidingCountY * this.rubberBandVal
                this.el.style.transform = `translateY(${moveY}px)`
            }

            
        },
        end(ev) {
            // 橡皮筋拉回效果
            this.rubberBand()
        }
    }
})
export default touchScrollY