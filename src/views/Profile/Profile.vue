<template>
  <div class="profile">
    <!-- 导航栏 -->
    <aside class="profile-bar">
      <Nav-menu></Nav-menu>
    </aside>
    <div class="profile-content">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script>
import NavMenu from '../../components/Profile/Nav_menu'
export default {
  name: "Profile",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
  components:{
    NavMenu
  }
};
</script>

<style>
.profile{
  display: flex;
  position: fixed;
  width: 80%;
  height: 80%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  box-shadow: 5px 5px 5px rgba(163, 162, 162, 0.5);
}
.profile-bar{
  width: 15%;
  border:1px solid #DCDFE6;
}
.profile-content{
  width: 85%;
  border:1px solid #DCDFE6;
  position: relative;
}

/* 订单总样式 */
.order{
  height: 100%;
  width: 100%;
  background-color: white;
}
.order-show{
  width: 100%;
  height: 92%;
  overflow-y: scroll;
}
</style>