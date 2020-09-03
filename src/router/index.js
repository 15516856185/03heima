import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Regirest from '../views/user/Regirest.vue'
import User from '../views/user/User.vue'
import Edit from '../views/user/Edit.vue'
import myfollow from '../views/user/myfollow.vue'
import mycomment from '../views/user/mycomment.vue'
import mystar from '../views/user/mystar.vue'
import index from '../views/index/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/regirest', component: Regirest, name: 'regirest' },
  { path: '/user', component: User, name: 'user' },
  { path: '/edit', component: Edit, name: 'edit' },
  { path: '/myfollow', component: myfollow, name: 'myfollow' },
  { path: '/mycomment', component: mycomment, name: 'mycomment' },
  { path: '/mystar', component: mystar, name: 'mystar' },
  { path: '/', component: index, name: 'index' }
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
  const authUrls = ['/user', '/user-edit', '/myfollow', '/mycomment', '/mystar']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
