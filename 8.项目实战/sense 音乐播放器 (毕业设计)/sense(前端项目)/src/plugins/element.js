import Vue from "vue";
import {
    Container, Header, Aside, Main, Footer,
    MenuItem, Button, Card, Input, Link,
    Notification 
    } from "element-ui";

// 遍历向Vue添加插件
const forUse = (array) => array.forEach(plugin => Vue.use(plugin))
// 遍历向Vue原型添加方法
const forAddPro = (array) => array.forEach(plugin => Vue.prototype.$notify = plugin)

forUse([
    Container, Header, Aside, Main, Footer,
    MenuItem, Button, Card, Input, Link
])
forAddPro([
    Notification
])
