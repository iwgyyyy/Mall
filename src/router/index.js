import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

//个人信息中的子集
const profile_child=[
  {
    path:'',
    redirect: '/profile/shopping_cart'
  },
  {
    path:'shopping_cart',
    component:()=>import('../components/Profile/Shoppingcart/Shopping_cart.vue')
  },
  {
    path:'order1',
    component:()=>import('../components/Profile/Order/Order1.vue'),
  },
  {
    path:'order2',
    component:()=>import('../components/Profile/Order/Order2.vue'),
  },
  {
    path:'order3',
    component:()=>import('../components/Profile/Order/Order3.vue'),
  },
  {
    path:'receiving_address',
    component:()=>import('../components/Profile/Receivingaddress/Receiving_address.vue')
  },
  {
    path:'personal_message',
    component:()=>import('../components/Profile/Personalmessage/Personal_message.vue')
  },
]
//主路由
const routes = [
  {
    path:'',
    redirect: '/main'
  },
  {
    path:'/main',
    component:()=>import('../views/Main/Main.vue')
  },
  {
    path:'/mall',
    component:()=>import('../views/Mall/Mall.vue')
  },
  {
    path:'/profile',
    component:()=>import('../views/Profile/Profile.vue'),
    children:profile_child
  },
  {
    path:'/goods_details/:goodsId',
    component:()=>import('../views/Mall/Goods_details.vue')
  },
  {
    path:'/order_details',
    component:()=>import('../components/Profile/Order/Order_details.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 前端路由监听，若用户没有登录，则跳转至主界面
// !important  后续还需要修改  可能需要后端监听路由
// bug之一  登录之后刷新页面会导致用户直接退出登录
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if(to.fullPath.startsWith('/profile') && store.state.sign_state){
    //不用修改to.fullPath的路径，next函数就表示下一个路径，如果不想使用to的原本路径，
    //可直接在next中传入一个对象，该对象内部的path属性即改变路由的地址且实时刷新
    next({path:'/main'})
  }else{
    next()//若不想修改to的原本路径 就直接调用next 不传入参数，表示按照原来to的路径访问
  }
  
  
})
export default router
