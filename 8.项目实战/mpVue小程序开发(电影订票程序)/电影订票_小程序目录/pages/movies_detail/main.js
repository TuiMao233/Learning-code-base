require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{Fts6:function(t,e,s){"use strict";var n=s("Dd8w"),a=s.n(n),c=s("NYxO");e.a={data:function(){return{subject:{}}},computed:a()({},Object(c.c)(["subjects"]),{castMsgStr:function(){return this.subject.casts.map(function(t){return t.name}).join("、")}}),beforeMount:function(){var t=this.$root.$mp.query.index;this.subject=this.subjects[t]}}},PrOl:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("5nAL"),a=s.n(n),c=s("upKx");new a.a(c.a).$mount()},T9ik:function(t,e){},upKx:function(t,e,s){"use strict";var n=s("Fts6"),a=s("za6w");var c=function(t){s("T9ik")},r=s("CCHf")(n.a,a.a,c,null,null);e.a=r.exports},za6w:function(t,e,s){"use strict";var n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("view",{staticClass:"movie_detail"},[s("image",{attrs:{src:t.subject.images.large}}),t._v(" "),s("text",{staticClass:"name"},[t._v(t._s(t.subject.title))]),t._v(" "),s("view",{staticClass:"movie_msg"},[s("text",[t._v("评分: "+t._s(t.subject.rating.average))]),t._v(" "),s("text",[t._v("导演: "+t._s(t.subject.directors[0].name))]),t._v(" "),s("text",[t._v("主演: "+t._s(t.castMsgStr))])]),t._v(" "),s("button",[t._v("我要观影")])],1)},staticRenderFns:[]};e.a=n}},["PrOl"]);