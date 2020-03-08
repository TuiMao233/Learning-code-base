//! 2. 定义储存库

//? 引入redux创建储存库(store)
import store from './store'
//? 引入方法常量命名
import {IN_CREMENT} from './action-types'


/*  ﻿ε≡٩(๑>₃<)۶
! 定义储存库===>
  !  第一个参数是储存库的类型，与储存库的值 
  !  第二个参数是储存库的行为, 用于定义改变储存值的方法
  !  action可以携带任意数据, 用于改变储存值状态 
  !      例:action.obj, action.data
  !  action.type是改变数据的方法类型
*/

const count = store((count = 0, action)=>{
    //? 定义方法行为
    switch (action.type) {
        case IN_CREMENT:
            return count + action.data
        default:return count
    }
})
export {count}
