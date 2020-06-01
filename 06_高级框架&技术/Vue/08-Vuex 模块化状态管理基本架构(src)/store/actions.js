import { PLUS, REDUCE, PLUSODD, ONESECPLUS } from './mutation-types'
export default {
  plus ({commit}) { commit(PLUS) },
  reduce ({commit}) { commit(REDUCE) },
  plusOdd ({commit}) { commit(PLUSODD) },
  oneSecPlus ({commit}) { commit(ONESECPLUS) }
}
