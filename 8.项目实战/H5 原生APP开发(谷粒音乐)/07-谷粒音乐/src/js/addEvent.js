
import touchNavi from './touch-navi'            // 导航栏滑屏封装对象
import touchMiCarousel from './touch-carousel'  // 滑屏轮播图封装对象
import touchScrollY from './touch-scrollY'      // 页面Y轴滑动封装对象
import touchCutoverMv from './touch-cutoverMv'  // 滑动切换MV封装对象
// 面包屑导航
const channel = document.querySelector('.channel')
const channel_navi = document.querySelector('.channel_navi')
// 导航栏
const naviMove = document.querySelector('.navi .navi_move')
const naviMoveItem = document.querySelectorAll('.navi .navi_move a')
// MV首播导航栏
const naviMv = document.querySelector('.MV-navi')
const naviMvItem = document.querySelectorAll('.MV-navi a')
//! 面包屑导航事件
channel.addEventListener('touchend',function (event) {
    channel.classList.toggle('active') 
    const isActive = channel.className.indexOf('active') !== -1
    channel_navi.style.display = isActive ? 'block' : 'none' // 如果有则类名，则转化为block 不然则none
    event.stopPropagation()
})

//! 导航栏项目点击事件
naviMove.addEventListener('touchstart', function () {this.isMove = false})
naviMove.addEventListener('touchmove', function () {this.isMove = true})
naviMove.addEventListener('touchend',function (event) {
    if(this.isMove){return}
    event = event || window.event;
    const targetEl = event.target
    //如果触发事件的对象是我们期望的元素，则执行否则不执行
    if(targetEl.nodeName.toLowerCase() == "a" ){
        if(window.naviIsMove){ return }
        for (let i = 0; i < naviMoveItem.length; i++) {
            const element = naviMoveItem[i];
            element.className = ''
        }
        targetEl.className = 'active'
    }
})

//! 导航栏滑屏事件
touchNavi.create({
    el:document.querySelector('.navi'),
    varyEl: document.querySelector('.navi_move')
})

//! 滑动切换MV事件
touchCutoverMv.create({
    el:document.querySelector('.MV-content'),
    varyEl: document.querySelector('.MV-content-move')
})
//! 点击切换MV事件
for (var i = 0; i < naviMvItem.length; i++) {naviMvItem[i].index = i}
console.log(naviMvItem)
naviMv.addEventListener('touchstart', function () {this.isMove = false})
naviMv.addEventListener('touchmove', function () {this.isMove = true})
naviMv.addEventListener('touchend',function (event) {
    if(this.isMove){return}
    event = event || window.event;
    const targetEl = event.target
    //如果触发事件的对象是我们期望的元素，则执行否则不执行
    if(targetEl.nodeName.toLowerCase() == "a" ){
        const activeIndex = document.querySelector('.MV-navi a.active').index
        const clickIndex = targetEl.index
        clickIndex > activeIndex ? (upMvData(clickIndex, 'right')) : 
        clickIndex < activeIndex ? (upMvData(clickIndex, 'left')) : undefined
    }
})

//! 无缝滑屏事件
touchMiCarousel.create({
    el: document.querySelector('.mi-carousel'),
    slidingDistance: document.documentElement.clientWidth / 4,   // 滑动多少才进行切换(px)
    endless: true,  // 是否无缝
    autoplay: true, // 是否自动切换
    delay: 4000,    // 自动切换延迟
})

//! 页面Y轴滑动事件
touchScrollY.create({
    el: document.querySelector('.content'),
    varyEl: document.querySelector('.content_move')
})