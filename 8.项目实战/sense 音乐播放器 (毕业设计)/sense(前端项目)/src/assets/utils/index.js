// 滚轮事件功能函数(数值)
export const onScroll = (el, doSomething) => {
    let ticking = false;
    el.addEventListener('scroll', function () {
        // 获取滚动值
        const last_known_scroll_position = el.scrollY;
        if (!ticking) {
            el.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;
    });
}

export function isEmail(str) { // 邮箱验证
    return /[A-Za-z0-9._%+-]+@@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(str)
}