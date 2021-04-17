<template>
  <nav class="index-bar">
    <div class="bar-title">
      <router-link to="/main"><img src="../../assets/svg/pets-logo.svg" alt="#" style="width:35px"></router-link> 
      <p>天虹网上宠物商城</p>
    </div>
    <!-- <div class="bar-search"><input type="text" /><button>搜索</button></div> -->
    <div class='div-button-search'>
      <div class="bar-button">
          <Nav-button
            button_name="首页"
            :img_src="require('../../assets/svg/pets-main.svg')"
            router_to_page="/main"
          ></Nav-button>
          <Nav-button
            button_name="商城"
            :img_src="require('../../assets/svg/pets-mall.svg')"
            router_to_page="/mall"
          ></Nav-button>
          <Nav-button
            v-if='$store.state.sign_state'
            button_name="登录"
            @click="show"
            :img_src="require('../../assets/svg/pre-profile.svg')"
            router_to_page="#"
          ></Nav-button>
          <Nav-button
            v-else
            button_name="我的"
            :img_src="require('../../assets/svg/pre-profile.svg')"
            router_to_page="/profile"
          ></Nav-button>
      </div>
      <div class="search">
        <Search-box></Search-box>
      </div>
    </div>
  </nav>
  <!-- 登录和注册弹框 -->
  <transition name="el-zoom-in-top">
    <Sign-register ref='sr'></Sign-register>
  </transition>
</template>

<script>
import NavButton from "./Nav_button"
import SignRegister from '../Profile/Sign_register/Sign_register'
import SearchBox from './Search_box'
import 'element-plus/lib/theme-chalk/base.css'

export default {
  name: "Navigation",
  created() {},
  data() {
    return {
    };
  },
  props: {},
  methods: {
    show(){
      this.$refs.sr.change=true
    },
  },
  components: {
    NavButton,
    SignRegister,
    SearchBox,
  },
};
</script>

<style>
.index-bar {
  display: flex;
  background: rgb(227, 228, 229);
  color: black;
  flex-direction: row;
  justify-content: space-between;
  height: 49px;
  z-index: 1;
}
.div-button-search{
  display:flex;
  width: 45%;
  justify-content: flex-end;
  margin-right: 1%;
}
.bar-title {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 25px;
}
.bar-button {
  width: 65%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition-duration: 500ms;
}

</style>
