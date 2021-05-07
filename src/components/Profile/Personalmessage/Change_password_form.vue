<template>
  <div class="check-password-form">
    <div class="check-password-control">
      <img src="../../../assets/svg/personal_message/password.svg" alt="#">
      <input type="password" placeholder="请输入原密码" v-model="oldPassword">
    </div>
    <div class="check-password-control">
      <img src="../../../assets/svg/personal_message/checkpassword.svg" alt="#">
      <input type="password" placeholder="请输入新密码" v-model="newPassword">
    </div>
    <div class="check-password-control">
      <el-button type="primary" @click="changePassword">确认</el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus';
export default {
  name: "ChangePasswordForm",
  created() {},
  data() {
    return {
      oldPassword:'',
      newPassword:'',
    };
  },
  props: {},
  methods: {
    cancel(){
      this.oldPassword=''
      this.newPassword=''
      this.$emit('cancelForm')
    },
    async changePassword(){
      if(this.newPassword.length<6){
        ElMessage.warning('密码长度不能小于6位')
        return 
      }
      // 先判断旧密码是否正确
      await axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/getPassword',
        data: {
          account:this.$store.state.account
        }
      }).then(res=>{
        // 如果旧密码符合要求则进行修改密码请求
        if(res.data==this.oldPassword){
          axios({
            method:'post',
            baseURL:'http://localhost:3000',
            url: '/changePassword',
            data: {
              account:this.$store.state.account,
              password:this.newPassword
            }
          }).then(res=>{
            if(res.status==200){
              ElMessage.success('修改成功！')
              this.cancel()
            }else{
              ElMessage.error('修改失败')
            }
          }).catch(err=>{
            console.log(err);
          })
        }else{
          ElMessage.error('原密码错误！')
        }
      }).catch(err=>{
        console.log(err);
      })
    },
  },
};
</script>

<style>
.check-password-form{
  position: absolute;
  background-color: white;
  width: 35%;
  height: 40%;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.check-password-control{
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-password-control img{
  width: 50px;
  height: 50px;
}
.check-password-control input{
  height: 40px;
  width: 200px;
  outline: none;
  border: 1px solid black;
  border-radius: 4px;
}
</style>