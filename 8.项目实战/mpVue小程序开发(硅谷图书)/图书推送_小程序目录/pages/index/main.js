require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{"4M/o":function(e,t,i){"use strict";var n={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"index"},[i("swiper",{attrs:{"indicator-dots":2!==e.swiper_index,"indicator-color":"rgba(255,255,255,.3)","indicator-active-color":"#fff",eventid:"1"},on:{change:e.handleChange}},[i("swiper-item",{attrs:{mpcomid:"0"}},[i("image",{attrs:{mode:"aspectFill",src:"/static/images/index/1.jpg"}})]),e._v(" "),i("swiper-item",{attrs:{mpcomid:"1"}},[i("image",{attrs:{mode:"aspectFill",src:"/static/images/index/2.jpg"}})]),e._v(" "),i("swiper-item",{attrs:{mpcomid:"2"}},[i("image",{attrs:{mode:"aspectFill",src:"/static/images/index/3.jpg"}}),e._v(" "),i("button",{directives:[{name:"show",rawName:"v-show",value:2==e.swiper_index,expression:"swiper_index == 2"}],attrs:{eventid:"0"},on:{click:e.gotoHome}},[e._v("开始体验")])],1)],1)],1)},staticRenderFns:[]};t.a=n},LXEv:function(e,t,i){"use strict";t.a={data:function(){return{swiper_index:0}},methods:{gotoHome:function(){return wx.switchTab({url:"/pages/home/main"})},handleChange:function(e){this.swiper_index=e.mp.detail.current}}}},MhDc:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("5nAL"),a=i.n(n),s=i("Qt9A");new a.a(s.a).$mount()},Qt9A:function(e,t,i){"use strict";var n=i("LXEv"),a=i("4M/o");var s=function(e){i("YLXm")},r=i("GbJU")(n.a,a.a,s,null,null);t.a=r.exports},YLXm:function(e,t){}},["MhDc"]);