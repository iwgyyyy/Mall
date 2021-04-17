<template>
<!-- Nav-menu-button有多个可选参数传入 button_message表示一个对象，其内部
含有左右两个图标和中间的路由跳转，若传入sign等于true 则表示需要展开图标，若传入的flag等于false则表示不需要
路由跳转，转而用文字代替 -->
  <div class="profile_aside">
    <div>
      <ul class="menu" >
        <li @click="show" :style="{'height':height}" class="order">
          <Nav-menu-button :button_message='order' :sign='temp' :flag='!temp' ref="my_order"></Nav-menu-button>
          <ul class="menu-child" @click.stop >
            <li><Nav-menu-button :button_message='order1' color="white"></Nav-menu-button></li>
            <li><Nav-menu-button :button_message='order2' color="white"></Nav-menu-button></li>
            <li><Nav-menu-button :button_message='order3' color="white"></Nav-menu-button></li>
          </ul>
        </li>
        <li>
          <Nav-menu-button :button_message="cart"></Nav-menu-button>
        </li>
        <li>
          <Nav-menu-button :button_message="follow"></Nav-menu-button>
        </li>
        <li>
          <Nav-menu-button :button_message="personal_message"></Nav-menu-button>
        </li>
      </ul>
    </div>
    <div style="height:10%;">
      <button class="sign_out" @click="signOut">退出登录</button>
    </div>
  </div>
</template>

<script>
import NavMenuButton from './Nav_menu_button'
import {ElMessage} from 'element-plus'
export default {
  name: "Nav_menu",
  created() {},
  data() {
    return {
      height:'60px',//展开关闭订单
      temp:true,//判断是否需要展开图标和按钮是否有效
      order:{
        name:'我的订单',
        pre_sign_svg:require('../../assets/svg/profile/order.svg'),
        post_sign_svg:require('../../assets/svg/profile/arrow-right.svg'),
        profile_route:''
      },
      order1:{
        name:'待收货',
        pre_sign_svg:require('../../assets/svg/profile/order1.svg'),
        profile_route:'/profile/order1'
      },
      order2:{
        name:'待支付',
        pre_sign_svg:require('../../assets/svg/profile/order2.svg'),
        profile_route:'/profile/order2'
      },
      order3:{
        name:'历史订单',
        pre_sign_svg:require('../../assets/svg/profile/order3.svg'),
        profile_route:'/profile/order3'
      },
      cart:{
        name:'购物车',
        pre_sign_svg:require('../../assets/svg/profile/empty-cart.svg'),
        profile_route:'/profile/shopping_cart'
      },
      follow:{
        name:'收货地址',
        pre_sign_svg:require('../../assets/svg/profile/receiving-address.svg'),
        profile_route:'/profile/receiving_address'
      },
      personal_message:{
        name:'个人信息',
        pre_sign_svg:require('../../assets/svg/profile/profile.svg'),
        profile_route:'/profile/personal_message'
      }

    };
  },
  props: {},
  methods: {
    show(){
      if(this.height=='60px'){
        this.height='240px'
        this.$refs.my_order.button_message.post_sign_svg=require('../../assets/svg/profile/arrow-down.svg')
      }
      else{
        this.height='60px'
        this.$refs.my_order.button_message.post_sign_svg=require('../../assets/svg/profile/arrow-right.svg')
      }
    },
    signOut(){
      if(confirm('您确定要退出吗')){
        this.$store.commit('changeStatetoTrue')
         ElMessage.success({
          message:'退出成功',
          type:'success'
        })
        this.$router.push('/main')
      }
    }
  },
  components:{
    NavMenuButton
  }
};
</script>

<style>
.profile_aside{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.menu{
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.menu-child{
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.order{
  overflow: hidden;
  transition-duration: 500ms;
}
.sign_out{
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  cursor: pointer;
}
.sign_out:hover{
  background-color: rgb(243, 53, 53);
  color:white;
}
</style>