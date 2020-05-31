import Vue from "vue";
import {
    Container, Header, Aside, Main, Footer,
    MenuItem, Button, Card, Input, Link, Upload,
    Avatar, Carousel, CarouselItem, divider, Radio,
    Table, TableColumn, RadioGroup, TimelineItem,
    Timeline, Image,
    Notification , Loading, Message
    } from "element-ui";

// 遍历向Vue添加插件
const forUse = (array) => array.forEach(plugin => Vue.use(plugin))
forUse([
    Container, Header, Aside, Main, Footer,
    MenuItem, Button, Card, Input, Link, Upload,
    Avatar, Carousel, CarouselItem, divider, Radio,
    Table, TableColumn, RadioGroup, TimelineItem,
    Timeline, Image,
])

// 向Vue原型添加方法
Vue.prototype.$notify = Notification;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;