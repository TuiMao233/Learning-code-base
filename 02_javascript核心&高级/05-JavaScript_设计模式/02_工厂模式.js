/* 
所谓工厂模式就是像工厂一样重复的产生类似的产品，
工厂模式只需要我们传入正确的参数，就能生产类似的产品；
工厂模式根据抽象程度依次分为简单工厂模式、工厂方法模式、抽象工厂模式；
*/
(function (window) {
  // 创建构造函数
  function Lyric() {
    return new Lyric.prototype.init(path)
  }
  // 向原型添加方法
  Lyric.prototype = {
    init: function () {
    },
    jianfangzi() {

    }
  }
  Lyric.prototype.init.prototype = Lyric.prototype;
  window.Lyric = Lyric;
})(window)