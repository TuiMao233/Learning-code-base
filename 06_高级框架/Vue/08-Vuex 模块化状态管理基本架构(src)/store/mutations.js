import { PLUS, REDUCE, PLUSODD, ONESECPLUS } from './mutation-types'
export default {
    [PLUS] (store) { store.cliNum++ },
    [REDUCE] (store) { store.cliNum-- },
    [PLUSODD] (store) { if((store.cliNum % 2) === 1) {store.cliNum++ } },
    [ONESECPLUS] (store) {
        setTimeout(() => {
            store.cliNum++
        }, 1000)
    }
}
