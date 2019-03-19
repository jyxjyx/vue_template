import Vue from 'vue'
import App from './App.vue'
import http from './http'
import Router from 'vue-router'
import routes from './route'
import 'element-ui/lib/theme-chalk/index.css';
import { Button } from 'element-ui'

Vue.use(Button);

Vue.config.productionTip = false;

Vue.prototype.$http = http;

Vue.use(Router);
const router = new Router({
    routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
