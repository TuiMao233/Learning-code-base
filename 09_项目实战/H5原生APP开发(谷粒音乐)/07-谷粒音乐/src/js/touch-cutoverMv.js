// 构建拖拽工具包
import ReusableDrag from 'reusable-drag'
// MV滑动切换事件
const touchCutoverMv = new ReusableDrag({
    data() {
        return {
            viewWidth: this.el.offsetWidth,
            page: 0,
            isloading: false
        }
    },
    mounted() {
        setTimeout(() => {// 初始化MV导航栏active样式显示
            const naviMvActive = document.querySelector('.MV-navi a.active')
            const naviMvActiveShow = document.querySelector('.MV-navi .active-show')
            naviMvActiveShow.style.left = naviMvActive.offsetLeft + 'px'
            naviMvActiveShow.style.width = naviMvActive.offsetWidth + 'px'
        });
        window.upMvData = this.upMvData
    },
    methods: {
        getMvMessage() { // 获取MV表单信息
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(true)
                }, 2000);
            })
        },
        async loading() { // 加载新内容
            this.isloading = true // 进入加载状态
            const loadingEl = document.querySelector('.MV-loading')
            setTimeout(() => loadingEl.style.opacity = 1 , 800);
            const mvMessage = await this.getMvMessage()
            if (mvMessage) { // 数据接收完毕, 显示页面
                loadingEl.style.opacity = 0
                this.varyEl.style.transition = '0.6s'
                this.varyEl.style.opacity = 1
            }
            this.isloading = false // 执行完毕, 关闭加载状态
        },
        coverEl (direction) { // 隐藏元素
            this.varyEl.style.transition = '0.8s'
            if(direction === 'right') {
                this.varyEl.style.transform = `translateX(${-this.viewWidth}px)`
            }
            if(direction === 'left'){
                this.varyEl.style.transform = `translateX(${this.viewWidth}px)`
            }
            setTimeout(() => { // 当动画执行完后隐藏元素
                this.varyEl.style.transition = 'none'
                this.varyEl.style.opacity = 0
                this.varyEl.style.transform = `translateX(${0}px)`
            }, 800);
        },
        upMvData(page, direction) { // 根据页码更新元素状态
            this.coverEl(direction)// 传入元素消失方向
            this.page = page

            const naviMvItem = document.querySelectorAll('.MV-navi a')
            const naviMvActiveShow = document.querySelector('.MV-navi .active-show')

            // 清除类名
            for (let i = 0; i < naviMvItem.length; i++) {const element = naviMvItem[i];element.className = ''}
            naviMvItem[page].className = 'active'
            setTimeout(() => {// 初始化MV导航栏active样式显示
                const naviMvActive = document.querySelector('.MV-navi a.active')
                naviMvActiveShow.style.left = naviMvActive.offsetLeft + 'px'
                naviMvActiveShow.style.width = naviMvActive.offsetWidth + 'px'
            });
            this.loading()
        },
        lookPage (length) {// 锁定page
            if (this.page > length) {
                this.page = 0
            }
            if (this.page < 0) {
                this.page = length
            }
        },

    },
    touch: {
        start(ev) {
            // 保存按下X/Y偏移量
            this.startClientX = ev.touches[0].clientX
            this.startClientY = ev.touches[0].clientY
            // 抖动方向判断初始值
            this.isShakeX = false
            this.isShakeY = false

            this.varyEl.style.transition = 'none'
            this.slidingCountX = 0
        },
        move(ev) {
            // 获取判断滑动值 
            this.slidingCountX = ev.touches[0].clientX - this.startClientX
            this.slidingCountY = ev.touches[0].clientY - this.startClientY
            //如果Y/X轴抖动，则直接返回 (防抖动)
            if (this.isShakeY) { return }
            if (this.isShakeY === this.isShakeX) {
                // 一次性逻辑, 判断抖动方向
                this.isShakeX = Math.abs(this.slidingCountY) < Math.abs(this.slidingCountX)
                this.isShakeY = Math.abs(this.slidingCountY) > Math.abs(this.slidingCountX)
                return
            }
            if (this.isloading) { return }
            this.moveX = this.slidingCountX
            this.varyEl.style.transform = `translateX(${this.moveX}px)`
        },
        end(ev) {
            // 如果Y轴抖动或加载中, 不执行end规则
            if (this.isShakeY) { return }
            if (this.isloading) { return }
            this.varyEl.style.transition = '0.8s'
            if (this.slidingCountX > 150) { // 页码减1
                this.page--;this.lookPage(5)
                this.upMvData(this.page, 'left')
            } else if (this.slidingCountX < -150) { // 页码加1
                this.page++;this.lookPage(5)
                this.upMvData(this.page, 'right')
            } else {
                this.varyEl.style.transform = `translateX(0px)`
            }

        }
    }
})

export default touchCutoverMv