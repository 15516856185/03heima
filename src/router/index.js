import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Regirest from '../views/Regirest.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import myfollow from '../views/myfollow.vue'
import mycomment from '../views/mycomment.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/regirest', component: Regirest, name: 'regirest' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/myfollow', component: myfollow, name: 'myfollow' },
  { path: '/mycomment', component: mycomment, name: 'mycomment' }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function (to, from, next) {
  // console.log('to', to)
  // console.log('from', from)
  // next()
  const token = localStorage.getItem('token')
  // if (to.name === 'user') {
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  const authUrls = ['/user', '/user-edit', '/myfollow', '/mycomment']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
