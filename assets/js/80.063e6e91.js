(window.webpackJsonp=window.webpackJsonp||[]).push([[80],{731:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"关于-android-证书"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关于-android-证书"}},[t._v("#")]),t._v(" 关于 Android 证书")]),t._v(" "),a("p",[t._v("Android平台打包发布apk应用，需要使用数字证书（.keystore文件）进行签名，用于表明开发者身份。")]),t._v(" "),a("p",[t._v("Android证书的生成是自助和免费的，不需要审批或付费。")]),t._v(" "),a("p",[t._v("可以使用JRE环境中的keytool命令生成。以下是windows平台生成证书的方法：")]),t._v(" "),a("h2",{attrs:{id:"安装-jre-环境"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#安装-jre-环境"}},[t._v("#")]),t._v(" 安装 JRE 环境")]),t._v(" "),a("p",[t._v("可从Oracle官方下载jre安装包：https://www.oracle.com/technetwork/java/javase/downloads/index.html")]),t._v(" "),a("h2",{attrs:{id:"生成签名证书"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成签名证书"}},[t._v("#")]),t._v(" 生成签名证书")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore\n")])])]),a("ul",[a("li",[t._v("testalias 是证书别名，可修改为自己想设置的字符，建议使用英文字母和数字")]),t._v(" "),a("li",[t._v("test.keystore 是证书文件名称，可修改为自己想设置的文件名称，也可以指定完整文件路径")])]),t._v(" "),a("p",[t._v("回车后会提示：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("Enter keystore password"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入证书文件密码，输入完成回车  ")]),t._v("\nRe"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("enter "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("password")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//再次输入证书文件密码，输入完成回车  ")]),t._v("\nWhat is your first and last name"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入名字和姓氏，输入完成回车  ")]),t._v("\nWhat is the name "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" your organizational unit"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入组织单位名称，输入完成回车  ")]),t._v("\nWhat is the name "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" your organization"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入组织名称，输入完成回车  ")]),t._v("\nWhat is the name "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" your City or Locality"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入城市或区域名称，输入完成回车  ")]),t._v("\nWhat is the name "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("of")]),t._v(" your State or Province"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入省/市/自治区名称，输入完成回车  ")]),t._v("\nWhat is the two"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("letter country code "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),t._v(" unit"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("Unknown"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//输入国家/地区代号（两个字母），中国为CN，输入完成回车  ")]),t._v("\nIs "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("CN")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("OU")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("O")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("L")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ST")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("C")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("XX")]),t._v(" correct"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v("  \n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("no"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//确认上面输入的内容是否正确，输入y，回车  ")]),t._v("\n\nEnter key password "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("testalias"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("  \n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("RETURN")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" same "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("as")]),t._v(" keystore password"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//确认证书密码与证书文件密码一样（HBuilder|HBuilderX要求这两个密码一致），直接回车就可以")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);