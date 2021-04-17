<template>
  <div class="check-password-form">
    <div class="check-password-control">
      <img src="../../../assets/svg/personal_message/password.svg" alt="#">
      <input type="text" placeholder="请输入原密码">
    </div>
    <div class="check-password-control">
      <img src="../../../assets/svg/personal_message/checkpassword.svg" alt="#">
      <input type="text" placeholder="请确认密码">
    </div>
    <div class="check-password-control">
      <el-button type="primary">确认</el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordForm",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
    cancel(){
      this.$emit('cancelForm')
    }
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