<template>
  <div class="personal-message">
    <Personal-message-form @showForm='showPasswordForm'></Personal-message-form>
  </div>
  <transition>
    <div v-show='passwordFormFlag' class="personal-message-changepassword">
      <Change-password-form @cancelForm='cancelPasswordForm'></Change-password-form>
    </div>
  </transition>
  
</template>

<script>
import PersonalMessageForm from './Personal_message_form'
import ChangePasswordForm from './Change_password_form'
export default {
  name: "Personal_message",
  created() {},
  data() {
    return {
      passwordFormFlag:false,
    };
  },
  props: {},
  methods: {
    showPasswordForm(){
      this.passwordFormFlag=true
    },
    cancelPasswordForm(){
      this.passwordFormFlag=false
    }
  },
  components:{
    PersonalMessageForm,
    ChangePasswordForm
  }
};
</script>

<style>
.personal-message{
  height: 100%;
  width: 100%;
  position: relative;
  background-color: rgb(240,240,240);
}
.personal-message-changepassword{
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
}


</style>