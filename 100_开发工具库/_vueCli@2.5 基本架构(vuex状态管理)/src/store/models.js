import * as mutationTypes from './models-types'
Object.keys(mutationTypes).forEach((key) => {
    window[key] = mutationTypes[key]
})

export default {
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    }
}