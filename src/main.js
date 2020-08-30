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
import navitem from './components/Navitem.vue'
import moment from 'moment'
Vue.filter('time', (input) => {
  return moment(input).format('YYYY-MM-DD')
})
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vant)
Vue.component('navitem', navitem)
Vue.component('logo', logo)
Vue.component('myheader', header)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
