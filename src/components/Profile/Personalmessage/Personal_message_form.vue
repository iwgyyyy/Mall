<template>
  <!-- 表单div -->
  <div class="personal-message-form">
    <!-- 昵称 -->
    <div class="personal-message-form-control">
      <img src="../../../assets/svg/personal_message/nickname.svg" alt="#">
      <input type="text" placeholder="请输入昵称" v-model="nickname">
    </div>
    <!-- 邮箱 -->
    <div class="personal-message-form-control">
      <img src="../../../assets/svg/personal_message/email.svg" alt="#">
      <input type="email" placeholder="请输入邮箱" v-model="email">
    </div>
    <!-- 手机号 -->
    <div class="personal-message-form-control">
      <img src="../../../assets/svg/personal_message/phone.svg" alt="#">
      <input type="tel" placeholder="请输入手机号" v-model="phonenumber">
    </div>
    <!-- 真实姓名 -->
    <div class="personal-message-form-control">
      <img src="../../../assets/svg/personal_message/realname.svg" alt="#">
      <input type="text" placeholder="请输入真实姓名" v-model="realname">
    </div>
    <!-- 性别 -->
    <div class="personal-message-form-control">
      <img src="../../../assets/svg/personal_message/sex.svg" alt="#">
      <el-radio v-model="sex" label="男">男</el-radio>
      <el-radio v-model="sex" label="女">女</el-radio>
      <el-radio v-model="sex" label="保密">保密</el-radio>
    </div>
    <!-- 按钮 -->
    <div>
      <el-button type="primary" @click="keepPersonalMessage">保存</el-button>
      <el-button type="warning" @click="changePassword">修改密码</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus';
export default {
  name: "PersonalMessageForm",
  created() {
    axios({
      method:'post',
      baseURL:'http://localhost:3000',
      url: '/getPersonalMessage',
      data: {
        account:this.$store.state.account
      }
    }).then(res=>{
      const personalMssage=res.data
      this.nickname=personalMssage.nickname?personalMssage.nickname:''
      this.email=personalMssage.email?personalMssage.email:''
      this.phonenumber=personalMssage.phonenumber?personalMssage.phonenumber:''
      this.realname=personalMssage.realname?personalMssage.realname:''
      this.sex=personalMssage.sex?personalMssage.sex:'男'
    }).catch(err=>{
      console.log(err);
    })
  },
  data() {
    return {
      check:true,
      sex:'男',
      nickname:'',
      email:'',
      phonenumber:'',
      realname:'',
      password:'',
    };
  },
  props: {},
  methods: {
    changePassword(){
      this.$emit('showForm')
    },
    // 检查个人信息
    checkMessage(){
      if(this.email==''&&this.phonenumber=='') return true
      const email_reg=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      const phone_reg=/^[1][3,5,7,8,9][0-9]{9}$/
      if(!email_reg.test(this.email)){
        ElMessage.warning('邮箱格式错误')
        return false
      }
      if(!phone_reg.test(this.phonenumber)){
        ElMessage.warning('手机格式错误')
        return false
      }
      return true
    },
    // 保存个人信息
    keepPersonalMessage(){
      if(this.checkMessage()){
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/keepPersonalMessage',
          data: {
            account:this.$store.state.account,
            email:this.email,
            phonenumber:this.phonenumber,
            sex:this.sex,
            nickname:this.nickname,
            realname:this.realname
          }
        }).then(res=>{
          if(res.status==200){
            ElMessage.success('修改成功！')
          }else if(res.status==500){
            ElMessage.error('修改失败。。')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
  },
};
</script>

<style>
.personal-message-form{
  height: 100%;
  width: 60%;
  background-color: rgb(245,245,245);
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.personal-message-form-control{
  width: 350px;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.personal-message-form-control img{
  height: 40px;

}
.personal-message-form-control input{
  outline: none;
  border: none;
  width: 250px;
  height: 40px;
  border-radius: 4px;
}
.personal-message-form-control input:focus{
  border:1px solid cornflowerblue;
}
</style>