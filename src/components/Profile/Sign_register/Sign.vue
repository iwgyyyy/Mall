<template>
  <div class="sign" v-show="sign_flag">
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/account.svg" alt="#">
      <input type="text" v-model="account" placeholder="请输入账号" />
    </div>
    <div class="flex-center">
      <img src="../../../assets/svg/sign_register/password.svg" alt="#">
      <input type="password" v-model="password" placeholder="请输入密码" />
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
import axios from 'axios'
import { ElMessage } from 'element-plus'
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
    // 判断输入是否为空
    checkIsNull(){
      if(!this.account) ElMessage.warning({message:'请输入账号',type:'warning'})
      else if(!this.password) ElMessage.warning({message:'请输入密码',type:'warning'})
      return this.account!==''&&this.password!==''
    },
    // 确定按钮
    signDetermine(){
      if(this.checkIsNull()){
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/login',
          data:{'account':this.account,"password":this.password}
        }).then(res=>{
          switch(res.data){
            case -1:
              ElMessage.error('没有找到该账号');
              break
            case 1:
              ElMessage.error('密码输入错误');
              break
            case 0:
              ElMessage.success({
                message: '登录成功！',
                type: 'success'
              })
              this.$emit('cancelSign')
              this.$store.commit('changeStatetoFalse')
              this.$store.commit('saveAccount',this.account)
              this.clearData()
              break
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    },
    // 取消按钮
    signCancel(){
      this.$emit('cancelSign')
      this.clearData()
    },
    // 跳转到注册界面
    toRegister(){
      this.$emit('signToRegister')
      this.sign_flag=false
      this.clearData()
    },
    // 清空登录框
    clearData(){
      this.account=''
      this.password=''
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