import Vue from "vue";
import { Button, Notification } from "element-ui";
Vue.use(Button);
Vue.prototype.$notify = Notification;