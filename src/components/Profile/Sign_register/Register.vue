<template>
  <div class="register flex-center" v-show='register_flag'>

    <div class="flex-y-center">
      <div class="flex-center">
        <img src="../../../assets/svg/sign_register/account.svg" alt="#">
        <input type="text" v-model="account" placeholder="请输入账号" required/>
      </div>
      <span :class="account_style">{{account_message}}</span>
    </div>

    <div class="flex-y-center">
      <div class="flex-center">
        <img src="../../../assets/svg/sign_register/password.svg" alt="#">
        <input type="password" v-model="password" placeholder="请输入密码" required/>
      </div>
      <span :class="passowrd_style">{{password_message}}</span>
    </div>

    <div class="flex-y-center">
      <div class="flex-center">
        <img src="../../../assets/svg/sign_register/checkpassword.svg" alt="#">
        <input type="password" v-model="checkpassword" placeholder="请确认密码" required/>
      </div>
      <span :class="checkpw_style">{{checkpw_message}}</span>
    </div>

    <div class="flex-y-center">
      <div class="flex-center">
        <img src="../../../assets/svg/sign_register/phonenumber.svg" alt="#">
        <input type="tel" v-model="phonenumber" placeholder="请输入手机号" required/>
      </div>
      <span :class="phonenum_style">{{phonenum_message}}</span>
    </div>

    <div class="flex-center">
      <el-button type="primary" @click="checkForm">确认注册</el-button>
      <el-button type="info" @click="toSign">返回</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default {
  name: "Register",
  created() {},
  data() {
    return {
      register_flag:false,account:'',password:'',checkpassword:'',phonenumber:'',
      account_message:'请输入账号',
      password_message:'请输入密码',
      checkpw_message:'请确认密码',
      phonenum_message:'请输入手机号码',
      account_style:'tips',
      passowrd_style:'tips',
      checkpw_style:'tips',
      phonenum_style:'tips',
    };
  },
  props: {},
  methods: {
    // 退出注册前清空页面数据 且隐藏注册界面
    clearData(){
      ;[this.account_style,this.passowrd_style,this.checkpw_style,this.phonenum_style]=['tips','tips','tips','tips']
      ;[this.account,this.password,this.checkpassword,this.phonenumber]=['','','','']
      this.register_flag=false
    },
    // 跳转至登录页面
    toSign(){
      this.clearData()
      this.$emit('registerToSign')
    },
    // 检查账号名
    checkAccount(){
      if(this.account.length>=6&&this.account.length<=16){
        this.account_message='正确'
        this.account_style='tips-right'
        return true
      }else{
        this.account_message='账号长度为6-16位'
        this.account_style='tips-wrong'
        return false
      }
    },
    // 检查密码
    checkPassword(){
      if(this.password.length>=8&&this.password.length<=32){
        this.password_message='正确'
        this.passowrd_style='tips-right'
        return true
      }else{
        this.password_message='密码长度在8-32位之间'
        this.passowrd_style='tips-wrong'
        return false
      }
    },
    // 验证密码是否一致
    checkRepassword(){
      if(this.checkpassword===this.password){
        this.checkpw_message='正确'
        this.checkpw_style='tips-right'
        return true
      }else{
        this.checkpw_message='两次输入的密码不一致'
        this.checkpw_style='tips-wrong'
        return false
      }
    },
    // 验证手机号码格式
    checkPhoneNumber(){
      const phone_reg=/^[1][3,5,7,8,9][0-9]{9}$/
      if(phone_reg.test(this.phonenumber)){
        this.phonenum_message='正确'
        this.phonenum_style='tips-right'
        return true
      }else{
        this.phonenum_message='手机格式不正确'
        this.phonenum_style='tips-wrong'
        return false
      }
    },
    // 检查表单并发送数据
    checkForm(){
      const flag=this.checkAccount()&&this.checkPassword()&&this.checkRepassword()&&this.checkPhoneNumber()
      if(flag){
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/register',
          data: {
            'account':this.account,
            'password':this.password,
            'phonenumber':this.phonenumber  
          }
        }).then(res=>{
          switch(res.data){
            case 0:
              this.account_message='该账号已被注册'
              this.account_style='tips-wrong'
              this.phonenum_message='该手机号已被注册'
              this.phonenum_style='tips-wrong'
              break
            case 1:
              this.account_message='该账号已被注册'
              this.account_style='tips-wrong'
              break
            case 2:
              this.phonenum_message='该手机号已被注册'
              this.phonenum_style='tips-wrong'
              break
            case 3:
              console.log('注册成功');
              ElMessage.success({
                message: '注册成功！请登录',
                type: 'success'
              });
              this.clearData()
              this.$emit('cancelRegister')
              break
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    }
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
.tips{
  font-size: 12px;
  color: rgba(255, 0, 0, 0);
}
.tips-right{
  font-size: 12px;
  color: rgba(0, 255, 0, 1);
}
.tips-wrong{
  font-size: 12px;
  color: rgba(255, 0, 0, 1);
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