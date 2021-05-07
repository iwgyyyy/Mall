<template>
  <div class="sr-div" v-show='change'>
    <div class="sr-div-child">
      <!-- 登录div -->
      <Signin 
      @cancelSign='cancel' 
      @signToRegister="showRegisterForm"
      ref='sign'>
      </Signin>
      <!-- 注册按钮 -->
      <Registeruser
      @cancelRegister='cancelRegisterShowSign'
      @registerToSign="showSignForm"
      ref='register'>
      </Registeruser>
    </div>
  </div>
</template>

<script>
// 必须要加{}才能导入element ui组件
import Signin from './Sign'
import Registeruser from './Register'

export default {
  name: "Sign_register",
  created() {},
  data() {
    return {
      change:false,
    };
  },
  props: {},
  methods: {
    // 登录界面的取消按钮
    cancel(){
      this.change=false
    },
    cancelRegisterShowSign(){
      this.cancel()
      this.showSignForm()
    },
    // 切换登录和注册界面
    showRegisterForm(){
      this.$refs.register.register_flag=true
    },
    showSignForm(){
      this.$refs.sign.sign_flag=true
    }
  },
  components:{
    Signin,
    Registeruser
  }
};
</script>

<style>
/* 隐藏的登录和注册框 */
.sr-div{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
}
.sr-div-child{
  position: absolute;
  left: 50%;
  top: 45%;
  width: 30%;
  height: 40%;
  transform: translate(-50%,-50%);
  border-radius: 25px;
  background-image: url('../../../assets/images/signBackground.jpg');
  background-size: 100% 100%;
}

.sr-div-child a{
  text-decoration: none;
  color: blue;
  cursor: pointer;
}
.sr-div-child a:hover{
  text-decoration: underline;
}


</style>
