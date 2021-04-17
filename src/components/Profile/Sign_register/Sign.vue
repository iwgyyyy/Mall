<template>
  <div class="sign" v-show="sign_flag">
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/account.svg" alt="#">
      <input type="text" v-model="account" placeholder="请输入账号" required/>
    </div>
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/password.svg" alt="#">
      <input type="password" v-model="password" placeholder="请输入密码" required/>
    </div>
    <div>
      <span>
        没有账号？点击这里
        <a @click="toRegister">注册</a>
      </span>
    </div>
    <div>
      <el-button @click="signDetermine" type="primary">确定</el-button>
      <el-button @click="signCancel" type="info">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sign",
  created() {},
  data() {
    return {
      account:'',password:'',sign_flag:true
    };
  },
  props: {},
  methods: {
    // 确定按钮
    signDetermine(){
      this.$emit('sign',this.account,this.password)
      this.account='',
      this.password=''
    },
    // 取消按钮
    signCancel(){
      this.$emit('cancelSign')
      this.account=''
      this.password=''
    },
    // 跳转到注册界面
    toRegister(){
      this.$emit('signToRegister')
      this.sign_flag=false
    }
  },
};
</script>

<style>
/* 登录框 */
.sign{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  top: 20%;
  left: 25%;
  width: 50%;
  height: 70%;
}
.sign img{
  height: 35px;
  width: 35px;
}
/* 登录界面的input框 */
.sign input{
  width: 200px;
  height: 35px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
}
.sign input:focus{
  border:1px solid cornflowerblue; 
}
</style>