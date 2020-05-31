function forIn(object, callback) {    // for in封装
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
           return callback(key, object[key])
        }
    }
}
function reqExpJudge(reqExp, str) {
    return (
        typeof str === 'string' &&
        reqExp.test(str)
    )
}
module.exports = {
    forIn, reqExpJudge
}