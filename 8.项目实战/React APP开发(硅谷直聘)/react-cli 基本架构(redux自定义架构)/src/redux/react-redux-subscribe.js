//? react-state-redux-subscript
function getOenObjKey(object) {//? 获取对象中的元素key值
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            return key
        }
    }
}
function storePushToState(storeObj, componentThis, combineDetermine) {//? state订阅封装函数
    let obj = {}
    if (storeObj['filter']) {//? 如果筛选存在，则对数据进行筛选订阅
        forIn(storeObj, (key, val) => {
            if (key !== 'filter') {
                let states = val.getState()
                storeObj['filter'].forEach((item, index) => {
                    forIn(states, (key, val) => {
                        if (key === item) {
                            obj[key] = val
                        }
                    })
                })
                val.subscribe(() => {
                    let states = val.getState()
                    storeObj['filter'].forEach((item, index) => {
                        forIn(states, (key, val) => {
                            // 当值改变时, 判断筛选值相同的, 对state进行更新处理
                            if (key === item) { componentThis.setState({ [key]: val }) }
                        })
                    })
                })
            }
        })
    } else {//? 如果筛选不存在，则对数据进行全部订阅
        forIn(storeObj, (key, val) => obj[key] = val.getState())
        forIn(storeObj, (key, val) => {//? 如果传进来的是一个储存库集合
            if (combineDetermine) {
                val.subscribe(() => {
                    forIn(val.getState(), (key, val) => {
                        componentThis.setState({ [key]: val })
                    })
                })

            } else {
                val.subscribe(() => {// 如果传进来的是一个储存库
                    componentThis.setState({ [key]: val.getState() })
                })
            }
        })
    }
    return obj
}
function attributeCount(obj) {//? 获取对象数量
    var count = 0;
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            if (i !== "need" && i !== "filter") {
                count++;
            }
        }
    }
    return count;
}
function error(conditions, str) {//? 抛错封装函数
    if (conditions) {
        throw new Error(str);
    }
}
function extractState(componentThis) {//? 提取state数据
    let obj = {}
    if (componentThis.state) {
        // 如果有值，则提取数据
        forIn(componentThis.state, (key, val) => {
            obj[key] = val
        })
    }
    return obj
}
function forIn(object, callback) { //? 遍历对象封装
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            callback(key, object[key])
        }
    }
}
function actionProcess(store, action) { //? 通知函数处理
    if (typeof action === "function") {
        //? 如果actions执行的是函数，则把store的dispatch方法传入
        action(store['dispatch'])
    } else if (typeof action === 'object') {
        //? 如果对象，则调用store的dispatch方法
        store.dispatch(action)
    }
}

function stateSubStore(store, actions, all = false) { //! 单个store绑定
    error(attributeCount(store) > 1, 'store No more than 2')
    // stateSubs对象处理
    return function (componentThis) {
        //? 判断该store是否需要绑定并订阅state
        if (typeof (store.need) == "undefined") {
            //? 获取原有的state数据
            let virtualState = extractState(componentThis)
            //! 对state进行订阅处理
            //? 执行订阅，并返回储存库的key:val
            let storeObj = storePushToState(store, componentThis, all)
            //? 绑定初始key:val
            componentThis.state = { ...virtualState, ...storeObj }
        }
        //! 对组件this方法的绑定处理
        componentThis['actions'] = {}
        if (typeof actions === 'object') {
            forIn(actions, (key, val) => {
                componentThis['actions'][key] = function (...props) {
                    let action = val(...props)
                    actionProcess(store[getOenObjKey(store)], action)
                }
            })
        }

    }
}


function stateSubStoreAll(store, actions) {
    stateSubStore(store, actions, true)
}


module.exports = { stateSubStore, stateSubStoreAll }