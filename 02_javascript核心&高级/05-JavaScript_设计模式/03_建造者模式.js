/* 
建造者模式可以将一个复杂的对象的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。
也就是说如果我们用了建造者模式，那么用户就需要指定需要建造的类型就可以得到它们，
而具体建造的过程和细节就不需要知道了。建造者模式实际就是一个指挥者，一个建造者，
一个使用指挥者调用具体建造者工作得出结果的客户。
*/
//1.产出东西是房子
//2.包工头调用工人进行开工 而且他要很清楚工人们具体的某一个大项
//3.工人是盖房子的 工人可以建卧室 建客厅 建厨房
//4.包工头只是一个接口而已 他不干活 他只对外说我能建房子

// 房子构造函数
function Fangzi() {//Fangzi可以理解为单例模式
  if (!(this instanceof Fangzi)) {
    return new Fangzi();
  }
  this.woshi = "";
  this.keting = "";
  this.chufang = "";
}
// 包工头构造函数
function Baogongtou() {
  if (!(this instanceof Baogongtou)) {
    return new Baogongtou();
  }
  this.jianfangzi = function (gongren) {
    gongren.jian_chufang();
    gongren.jian_keting();
    gongren.jian_woshi();
  }
}
// 工人构造函数
function Gongren() {
  if (!(this instanceof Gongren)) {
    return new Gongren();
  }
  this.jian_woshi = function () {
    console.log("建卧室");
  }
  this.jian_keting = function () {
    console.log("建客厅");
  }
  this.jian_chufang = function () {
    console.log("建厨房");
  }
  this.jiaofang = function () {
    var _fangzi = new Fangzi();
    _fangzi.woshi = "ok";
    _fangzi.keting = "ok";
    _fangzi.chufang = "ok";
    return _fangzi;
  }
}
// 创建工人实例
var gongren = new Gongren();
// 创建包工头实例
var baogongtou = new Baogongtou();
// 包工头调用工人进行建房子
baogongtou.jianfangzi(gongren);
// 工人返回一个房子
var myfangzi = gongren.jiaofang();

console.log(myfangzi);