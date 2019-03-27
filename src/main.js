// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'

//挂载在Vue的原型上
Vue.prototype.axios = axios;

Vue.config.productionTip = false


//注册elementUI
Vue.use(ElementUI);
/* eslint-disable no-new */
//相关组件挂载到Vue  router  store
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
