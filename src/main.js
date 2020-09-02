import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './styles/base.css'
import './styles/iconfont.css'
import 'amfe-flexible'

// // 引入全局组件
import './utility/global'
// // 引入全局vant组件
import './utility/vant'
// // 引入全局过滤器
import './utility/filter'
// // 引入全局ajax请求
import './utility/requres'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
