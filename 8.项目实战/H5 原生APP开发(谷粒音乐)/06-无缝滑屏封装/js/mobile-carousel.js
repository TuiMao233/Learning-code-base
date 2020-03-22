// 无缝滑屏封装
const touchMiCarousel = new reusableDrag({
    data() {
        return {
            wrapper: this.el.querySelector('.wrapper'),
            pagination: this.el.querySelector('.pagination'),
            slidingDistance: 300,
            delay: 2000,
        }
    },
    mounted() {
        // 保存原容器项目长度
        this.wrapperOriginalLength = this.wrapper.childElementCount
        this.wrapperOriginaHTML = this.wrapper.innerHTML
        // 如果无缝，则复制一组项目添加到容器
        this.endless && (this.wrapper.innerHTML += this.wrapper.innerHTML)
        // 保存复制后的长度
        this.wrapperLength = this.wrapper.childElementCount
        // 获取单个项目宽度
        this.slideWidth = this.wrapper.children[0].offsetWidth
        this.page = this.endless ? this.wrapperOriginalLength : 0
        this.SpeedUp3d = '' // 定义3d硬件加速默认为空

        this.setWidth(this.wrapperLength)   // 根据长度设置容器与项目宽度
        this.generateComponents(this.wrapperOriginalLength) // 根据原长度生成零件
        this.upDate(this.page % this.wrapperOriginalLength) // 根据索引更新零件
        if (this.endless && this.autoplay) {//!  如果有轮播并且是无缝
            this.SpeedUp3d = 'translateZ(0)'
            this.autoplaycreate() // 执行轮播函数
        }
        // 初始化显示第一张
        this.wrapper.style.transform = `translateX(${-(this.page * this.slideWidth)}px) ${this.SpeedUp3d}`
    },
    methods: {
        setWidth(length) {// 宽度设置
            var slides = this.wrapper.children
            // 初始化复制后宽度
            this.wrapper.style.width = length + '00%'
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.width = 100 / length + '%'
            }
        },
        generateComponents(length) { // 组件生成
            if (this.pagination) { // 小圆点生成
                this.pagination.innerHTML = ''
                for (let i = 0; i < length; i++) {
                    this.pagination.innerHTML += `<div></div>`
                }
            }
        },
        upDate(page) {// 定义更新数据行为
            if (this.pagination) {
                var paginations = this.pagination.children

                for (let i = 0; i < paginations.length; i++) {
                    paginations[i].className = ''
                }
                paginations[page].className = 'active'

            }
        },
        endlesslogic() { // 定义无缝计算
            if (this.page === 0) {
                this.page = this.wrapperOriginalLength
            } else if (this.page === this.wrapperLength - 1) {
                this.page = this.wrapperOriginalLength - 1
            }
            this.wrapper.style.transition = 'none'
            this.wrapper.style.transform = `translateX(${-(this.page * this.slideWidth)}px)`
        },
        autoplaycreate() { // 定义生成轮播
            this.timer = setInterval(() => {
                this.endlesslogic()
                setTimeout(() => { //! 渲染并不是同步的！ 所以执行了无缝逻辑后，将轮播逻辑推入栈中，堆栈会等渲染完毕再执行
                    this.page += 1
                    this.wrapper.style.transition = '0.3s'
                    this.wrapper.style.transform = `translateX(${-(this.page * this.slideWidth)}px) ${this.SpeedUp3d}`
                    this.upDate(this.page % this.wrapperOriginalLength) //! 根据索引更新零件
                })
            }, this.delay)
        }
    },
    touch: {
        start: function (ev) {
            this.wrapper.style.transition = 'none'// 在执行滑动前，关闭动画
            this.endless && this.endlesslogic()// 如果有无缝 执行无缝逻辑
            this.endless && this.autoplay && clearInterval(this.timer)//  如果有轮播，滑动期间禁止滚动
            // 保存按下时轮播图距离浏览器的偏移量
            this.startMoveOffsetX = this.wrapper.getBoundingClientRect().x - ev.touches[0].clientX
            // 保存按下X/Y偏移量
            this.startClientX = ev.touches[0].clientX
            this.startClientY = ev.touches[0].clientY
            // 抖动判断
            this.isShakeX = false
            this.isShakeY = false
        },
        move: function (ev) {
            // 获取判断滑动值 
            this.slidingCountX = ev.touches[0].clientX - this.startClientX
            this.slidingCountY = ev.touches[0].clientY - this.startClientY

            //如果Y轴抖动，则直接返回 (防抖动)
            if (this.isShakeY) { return }
            if(this.isShakeY === this.isShakeX){
                this.isShakeX = Math.abs(this.slidingCountY) < Math.abs(this.slidingCountX)
                this.isShakeY = Math.abs(this.slidingCountY) > Math.abs(this.slidingCountX)
                if(this.isShakeY){return}
            }




            // 手指位置 + 手指点击时轮播图容器距离浏览器的偏移量 = 轮播图容器偏移量
            var wrapper_slidingsetX = ev.touches[0].clientX + this.startMoveOffsetX
            // 如果滑动超出了一个元素的宽度，则固定宽度
            if (this.slidingCountX > this.slideWidth) {
                wrapper_slidingsetX = -((this.page - 1) * this.slideWidth)
            } else if (this.slidingCountX < -this.slideWidth) {
                wrapper_slidingsetX = -((this.page + 1) * this.slideWidth)
            }
            if (!this.endless) {//! 如果没有无缝,固定两侧
                if (this.page === 0 && this.slidingCountX > 0) {
                    wrapper_slidingsetX = 0
                    this.slidingCountX = 0
                }
                if (this.page === this.wrapperLength - 1 && this.slidingCountX < 0) {
                    wrapper_slidingsetX = -((this.wrapperLength - 1) * this.slideWidth)
                    this.slidingCountX = 0
                }
            }
            this.wrapper.style.transform = `translateX(${wrapper_slidingsetX}px) ${this.SpeedUp3d}`
        },
        end: function (ev) {
            // 如果Y轴抖动, 不执行end逻辑
            if (this.isShakeY) { return }

            //  如果有轮播  松开时启动轮播
            this.endless && this.autoplay && this.autoplaycreate()
            // 判断是左滑动还是右滑动,以及有没有超过滑动距离值
            this.page = (this.slidingCountX > this.slidingDistance) ? (this.page -= 1) :
                (this.slidingCountX < -this.slidingDistance) ? (this.page += 1) :
                    this.page
            this.wrapper.style.transition = '0.3s'
            this.wrapper.style.transform = `translateX(${-(this.page * this.slideWidth)}px) ${this.SpeedUp3d}`
            this.upDate(this.page % this.wrapperOriginalLength)
        }
    },
    /* mouse: {down (ev) {},move (ev) {},up (ev) {}},*/
    delete() {
        this.wrapper.innerHTML = this.wrapperOriginaHTML
        this.wrapper.style = ''
    }
})
