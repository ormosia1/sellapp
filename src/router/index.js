import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path: '/', component: () => import('../views/Goods.vue')},
      // 二级路由的商品页面
      {path: '/goods', component: () => import('../views/Goods.vue')},
      // 二级路由的商家页面
      {path: '/merchant', component: () => import('../views/Merchant.vue')},
      // 二级路由的评价页面
      {path: '/evaluate', component: () => import('../views/Evaluate.vue')},
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
