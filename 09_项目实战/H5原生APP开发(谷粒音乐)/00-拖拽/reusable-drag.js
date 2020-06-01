

(function (window) {
    function ReusableDrag(dragRule) { // 拖拽函数
        return ReusableDrag.prototype.init(dragRule)
    }
    ReusableDrag.prototype = {
        init: function (dragRule) { // 初始化数据
            this.dragRule = dragRule // 获取拖动dom
            this.hook = {}
        },
        getDragRect: function (dragEl, bit) { // 获取拖动块内指针坐标
            var dragRect = {
                x: bit.x - dragEl.getBoundingClientRect().x, 
                y: bit.y - dragEl.getBoundingClientRect().y, // 获取拖动块内y轴
                width: dragEl.getBoundingClientRect().width, // 获取拖动块宽
                height: dragEl.getBoundingClientRect().height // 获取托都块高
            }
            if(bit.target){dragRect.target = bit.target}
            return dragRect
        },
        getTouchRect: function (dragEl, bit) {  //! 获取拖动块内手指坐标
            var $this = this
            var rects = {}
            Object.keys(bit).map(bitName=>{
                rects[bitName] = Array.prototype.slice.call(bit[bitName]).map(item =>{
                    return $this.getDragRect(dragEl,item)
                })
            })
            return rects
        },
        getEvLocation: function (ev) {//! 获取手指列表详情
            //! 将触发当前事件的手指列表，触发当前事件时元素上的手指列表，触发当前事件时屏幕上的手指列表的所有信息进行封装
            var bit = { touches: [], targetTouches: [], changedTouches: [] }
            Object.keys(bit).forEach((item) => {
                bit[item] = Array.prototype.slice.call(ev[item]).map(function (item) {
                    return { target: item.target, x: item.clientX, y: item.clientY }//! 距离浏览器左上角的距离
                    // return item
                })
            })
            return bit
        },
        dragEv: function (dragEl, hook) { // 拖拽事件封装
            hook = hook || {}
            var dragRule = this.dragRule
            var $this = this
            dragEl.onmousedown = function (ev) {
                //当点击时所有事件都捕获为dragEl的事件
                document.setCapture && document.setCapture();
                // 兼容浏览器
                ev = ev || window.event;
                // 将按下位置保存为startBit(初始位)
                var startBit = { x: ev.clientX, y: ev.clientY }

                // 执行拖拽元素规则 传入鼠标位置与拖动元素
                dragRule.mousedown && dragRule.mousedown.call(dragEl, startBit)
                // 执行按下回调,传入元素内移动值和宽高 如果没有值,则不执行
                hook.mousedown && hook.mousedown.call(dragEl, $this.getDragRect(dragEl, startBit))

                // ondragenter ondragover事件内容为event.preventDefault()
                document.onmousemove = function (ev) {
                    ev = ev || window.event;
                    // 将按下位置保存为startBit(移动位)
                    var moveBit = { x: ev.clientX, y: ev.clientY }

                    // 执行拖拽元素规则 传入鼠标位置与拖动元素
                    dragRule.mousemove && dragRule.mousemove.call(dragEl, moveBit)
                    // 执行移动回调,传入元素内移动值和宽高 如果没有值,则不执行
                    hook.mousemove && hook.mousemove.call(dragEl, $this.getDragRect(dragEl, moveBit))



                    document.onmouseup = function (ev) {
                        ev = ev || window.event;
                        // 释放document的move事件
                        document.onmousemove = null;
                        // 释放document的onmouseup事件
                        document.onmouseup = null;
                        //释放dragEl的点击事件
                        document.releaseCapture && document.releaseCapture();
                        // 将按下位置保存为startBit(移动位)
                        var endBit = { x: ev.clientX, y: ev.clientY }

                        // 执行拖拽元素规则 传入鼠标位置与拖动元素
                        dragRule.mouseup && dragRule.mouseup.call(dragEl, endBit)
                        // 执行松开回调
                        hook.mouseup && hook.mouseup.call(dragEl, $this.getDragRect(dragEl, endBit))
                    }
                    return;


                }; return;
            }
        },
        touchEv: function (dragEl, hook) {
            hook = hook || this.hook
            var dragRule = this.dragRule
            var $this = this;
            dragEl.addEventListener('touchstart', start)
            dragEl.addEventListener('touchmove', move)
            dragEl.addEventListener('touchend', end)
            function start(ev) {
                //当点击时所有事件都捕获为dragEl的事件
                dragEl.setCapture && dragEl.setCapture();
                // 兼容浏览器
                ev = ev || window.event;

                //! 获取事件手指信息
                var startBit = $this.getEvLocation(ev)
                // 执行拖拽元素规则 传入手指位置与拖动元素
                dragRule.touchstart && dragRule.touchstart.call(dragEl, startBit)
                // 执行按下回调,传入元素内移动值和宽高 如果没有值,则不执行
                hook.touchstart && hook.touchstart.call(dragEl, $this.getTouchRect(dragEl, startBit))
            }
            function move(ev) {
                ev = ev || window.event;

                //! 获取事件手指信息
                var moveBit = $this.getEvLocation(ev)
                // 执行拖拽元素规则 传入手指位置与拖动元素
                dragRule.touchmove && dragRule.touchmove.call(dragEl, moveBit)
                // 执行移动回调,传入元素内移动值和宽高 如果没有值,则不执行
                hook.touchmove && hook.touchmove.call(dragEl, $this.getTouchRect(dragEl, moveBit))
            }
            function end(ev) {
                ev = ev || window.event;
                //释放dragEl的事件
                dragEl.releaseCapture && dragEl.releaseCapture();
                var endBit = $this.getEvLocation(ev)
                // 执行拖拽元素规则 传入手指位置与拖动元素
                dragRule.touchend && dragRule.touchend.call(dragEl, endBit)
                // 执行松开回调
                hook.touchend && hook.touchend.call(dragEl, $this.getTouchRect(dragEl, endBit))
            }




        }
    }
    ReusableDrag.prototype.init.prototype = ReusableDrag.prototype
    window.ReusableDrag = ReusableDrag
})(window)
// module.exports = { ReusableDrag }