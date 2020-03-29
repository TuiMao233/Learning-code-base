/* 
 动态计算重定向路径值
 四种情况
 用户界面路由
    laoban
    dashen
 用户信息完善
    laobaninfo
    dasheninfo
*/
export function gerRedirectTo({ type, header }) {
    let path
    if (type === 'laoban') { // 如果是老板
        path = 'laoban'
    } else {// 如果是大神
        path = 'dashen'
    }
    if (!header) {// 如果没有头像
        path += 'info'
    }
    return path
}

export function getCookie(key) {
    var cookies = document.cookie.split(';')

    if (key) { // 当传入值时返回指定key的内容
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split('=')
            if (cookie[0].trim() === key) { return cookie[1] }
        }
    } else {// 没有传入值时,默认返回一个对象,里面包含所有的cookie
        var obj = {}
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=')
            obj[cookie[0].trim()] = cookie[1]
        }; return obj
    }
}