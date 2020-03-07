import {count} from './reducers'
import {inCrement, deCrement, inCrementAsync} from './actions'
import stateSubs from 'react-redux-subscript'


export const AppStateSus = stateSubs({count},{
    inCrement, deCrement, inCrementAsync
})