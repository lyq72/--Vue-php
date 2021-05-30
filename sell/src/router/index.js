/*
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home/home.vue'
import order from '../pages/order/order.vue'
import user from '../pages/user/user.vue'
import login from '../pages/login/login'
import shop from '../pages/shop/shop'
import goods from '../pages/shop/goods/goods'
import ratings from '../pages/shop/ratings/ratings'
import shopinfo from '../pages/shop/shopinfo/shopinfo'
import all from '../pages/home/all/all'
import pay from '../pages/pay/pay'
import pinglun from '../pages/pinglun/pinglun'
//声明使用插件
Vue.use(VueRouter)
export default new VueRouter({
  mode:'history',
  //所有理由
  routes:[
    {
      path:'/home',
      component:home,
      children:[
        {
          path: 'all',
          component: all,
          meta:{
            showfooter:true
          },
        },
        {
            path: '',
            redirect: 'all'
        },
      ]
    },
    {
      path:'/order',
      component:order,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/user',
      component:user,
      meta:{
        showfooter:true
      }
    },
    {
      path:'/',
      redirect:"/home"
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/shop',
      component:shop,
      children:[
        {
          path:'goods',
          component:goods
        },
        {
          path: 'ratings',
          component: ratings
        },
        {
          path: 'shopinfo',
          component:shopinfo
        },
        {
          path: '',
          redirect: 'goods'
        },
      ]
    },
    {
      path:'/pay',
      component:pay
    },
    {
      path:'/pinglun',
      component:pinglun
    },
  ]
})

