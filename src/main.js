import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import tiya from "@/components"
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(tiya)
import './assets/css/common.css'
import './assets/css/reset.css'

import {post,get} from './config/httpconfig'
import 'lib-flexible/flexible.js'
//全局挂载
Vue.prototype.post = post;
Vue.prototype.get = get;

Vue.prototype.http = axios;


// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

// Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


