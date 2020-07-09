// for in封装
export function forIn(object, callback) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      callback(key, object[key])
    }
  }
  return object
}