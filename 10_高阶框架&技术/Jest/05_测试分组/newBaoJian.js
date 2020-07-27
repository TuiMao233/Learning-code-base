/*
 * @Author: Mr_Mao
 * @Date: 2020-07-23 21:16:49
 * @LastEditTime: 2020-07-25 11:31:12
 * @LastEditors: Mr_Mao
 * @佛祖保佑，永无bug
 */ 
export default class {
  gongzhu(number) {
    this.user = number == 1 ? '大脚' : '刘英'
  }
  anjiao() {
    this.fuwu = this.user + '走进房间为你足疗'
  }
  anmo() {
    this.fuwu = this.user + '走进房间为你按摩'
  }
  taishi () {
    this.fuwu = this.user + '走进房间为你_泰式保健'
  }
  gongting() {
    this.fuwu = this.user+ '走进房间为你_宫廷御疗'
  }
}