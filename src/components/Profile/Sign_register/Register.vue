<template>
  <div class="register flex-center" v-show='register_flag'>
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/account.svg" alt="#">
      <input type="text" v-model="account" placeholder="请输入账号" required/>
    </div>
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/password.svg" alt="#">
      <input type="password" v-model="password" placeholder="请输入密码" required/>
    </div>
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/checkpassword.svg" alt="#">
      <input type="password" v-model="checkpassword" placeholder="请确认密码" required/>
    </div>
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/phonenumber.svg" alt="#">
      <input type="tel" v-model="phonenumber" placeholder="请输入手机号" required/>
    </div>
    <div class="flex-center">
      <el-button type="primary" @click="confirmRegister">确认注册</el-button>
      <el-button type="info" @click="toSign">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  created() {},
  data() {
    return {
      register_flag:false,
      account:'',
      password:'',
      checkpassword:'',
      phonenumber:'',
    };
  },
  props: {},
  methods: {
    // 跳转至登录页面
    toSign(){
      this.$emit('registerToSign')
      this.register_flag=false
    },
    // 
  },
};
</script>

<style>
.register{
  position: absolute;
  width: 80%;
  height: 100%;
  top:0;
  left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.register img{
  height: 35px;
  width: 35px;
}
/* 登录界面的input框 */
.register input{
  width: 200px;
  height: 35px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
}
.register input:focus{
  border:1px solid cornflowerblue; 
}
</style>