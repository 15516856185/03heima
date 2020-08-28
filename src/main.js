import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.css'
import './styles/iconfont.css'
import header from './components/MyHeader.vue'
import logo from './components/Logo.vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import 'amfe-flexible'
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vant)
Vue.component('logo', logo)
Vue.component('myheader', header)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
