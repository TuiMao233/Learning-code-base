import {count} from './reducers'
import {inCrement, deCrement, inCrementAsync} from './actions'

//? 引入react-redux-store订阅库
import {stateSub, stateSubAll} from 'react-redux-subscript'


/*  ψ(*｀ー´)ψ绑定多个
export const AppStateSus = stateSubAll([
    {
        store:{count},
        actions:{
            inCrement, deCrement, inCrementAsync
    }},
    ......
]) */
// (✪ω✪)绑定一个
export const AppStateSus = stateSub({count},{inCrement,deCrement,inCrementAsync})
