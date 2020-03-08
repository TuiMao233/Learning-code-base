import {count} from './reducers'
import {inCrement, deCrement, inCrementAsync} from './actions'

import {stateSub, stateSubAll} from 'react-redux-subscript'

/* 
export const AppStateSus = stateSubAll([
    {
        store:{count},
        actions:{
            inCrement, deCrement, inCrementAsync
    }}
]) */
export const AppStateSus = stateSub({count},{inCrement,deCrement,inCrementAsync})
