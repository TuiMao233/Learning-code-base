/* 
责任链模式指的是——某个请求需要多个对象进行处理，
从而避免请求的发送者和接收之间的耦合关系。
将这些对象连成一条链子，并沿着这条链子传递该请求，
直到有对象处理它为止。
*/
async function getUserInfo() {
  
}
async function getUserID() {
  
}
async function getUserWork() {
  
}
class IHandler {
  constructor () {

  }
}

const iHandler = new IHandler()

iHandler.req(getUserInfo)
iHandler.req(getUserID)
iHandler.req(getUserWork)

iHandler.req()