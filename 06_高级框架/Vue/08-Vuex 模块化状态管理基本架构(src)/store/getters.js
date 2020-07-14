export default {
    type (store) {
        return store.cliNum % 2 === 0 ? '偶数' : '奇数'
    }
}
