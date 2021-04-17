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
    <!-- 密码 -->
    <div class="personal-message-form-control">
      <img src="../../../assets/svg/personal_message/password.svg" alt="#">
      <input type="password"  v-model="password" :disabled='check' placeholder="*********">
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
      <el-button type="primary">保存</el-button>
      <el-button type="warning" @click="changePassword">修改密码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalMessageForm",
  created() {},
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
    }
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