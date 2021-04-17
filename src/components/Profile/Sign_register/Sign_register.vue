<template>
  <div class="sr-div" v-show='change'>
    <div class="sr-div-child">
      <!-- 登录div -->
      <Sign 
      @sign='determine' 
      @cancelSign='cancel' 
      @signToRegister="showRegisterForm"
      ref='sign'>
      </Sign>
      <!-- 注册按钮 -->
      <Register
      @registerToSign="showSignForm"
      ref='register'>
      </Register>
    </div>
  </div>
</template>

<script>
// 必须要加{}才能导入element ui组件
import Sign from './Sign'
import Register from './Register'
import  {ElMessage}  from 'element-plus'
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
    // 登录界面的确定按钮
    determine(account,password){
      if(account='jc' && password=='11'){
        this.change=false
        this.$store.commit('changeStatetoFalse')
        ElMessage.success({
          message:'登录成功',
          type:'success'
        })
      }else{
        ElMessage.error({
          message:'账号或密码错误',
          type:'error'
        })
      }
      
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
    Sign,
    Register
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
  background:linear-gradient(to right,rgb(255, 172, 172),rgb(109, 255, 109));
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
