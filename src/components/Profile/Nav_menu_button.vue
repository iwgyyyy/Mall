<template>
  <div class="menu-button" :style="{'background-color':color}" @click="toProfileRoute">
    <img :src="button_message.pre_sign_svg" alt="#" class="pre-sign-svg">
    <router-link v-if='flag' :to="button_message.profile_route">{{button_message.name}}</router-link>
    <button v-else>{{button_message.name}}</button>
    <img v-if="sign" :src="button_message.post_sign_svg" alt="#" class="post-sign-svg">
  </div>
</template>

<script>
export default {
  name: "Nav_menu_button",
  created() {},
  data() {
    return {};
  },
  props: {
    button_message:{
      type:Object,
      default:{
        name:'按钮',
        pre_sign_svg:require('../../assets/svg/profile/order.svg'),
        post_sign_svg:require('../../assets/svg/profile/arrow-right.svg'),
      }
    },
    sign:{
      type:Boolean,
      default:false
    },
    flag:{
      type:Boolean,
      default:true
    },
    color:{
      type:String,
      default:'rgb(250,250,250)'
    }
  },
  methods: {
    toProfileRoute(){
      this.$router.push(this.button_message.profile_route)
    }
  },
};
</script>

<style>
.menu-button{
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
}
.menu-button:hover{
  background-color: cornflowerblue !important;
}
.menu-button:hover a{
  color:white;
}
.menu-button:hover button{
  color:white;
}
.pre-sign-svg{
  width: 25px;
  height: 25px;
  margin-left: 5%;
  margin-right: 25%;
}
.post-sign-svg{
  width: 20px;
  height: 20px;
  margin-right: 3%;
}
.menu-button a{
  text-decoration: none;
  margin-right: 17%;
  color: black;
}
.menu-button button{
  margin-right: 17%;
  outline: none;
  border: none;
  color:black;
  background-color: transparent;
  padding: 0;
  font-size: 16px;
}
</style>