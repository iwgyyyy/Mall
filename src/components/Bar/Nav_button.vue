<template>
  <div class="nav-button" @click="showPage">
    <router-link :to="router_to_page" class="nav-router">{{ button_name }}</router-link>
    <router-link :to="router_to_page">
      <img :src="img_src" alt="#" class="nav-svg"/>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Nav_button",
  created() {},
  data() {
    return {};
  },
  props: {
    button_name: String,
    img_src: String,
    router_to_page: String,
  },
  methods: {
    showPage(){
      this.$router.push(this.router_to_page)
    }
  },
};
</script>

<style>
.nav-button {
  overflow: hidden;
  cursor: pointer;
}
/* 行内元素不能使用transform变形 */
.nav-button:hover a{
  transform: translateX(-100%);
}
.nav-button:hover img {
  transform: translateX(-100%);
  width: 30px;
  height: 30px;
}
.nav-svg {
  width: 22px;
  height: 25px;
  vertical-align: bottom;
  transition-duration: 700ms;
}
.nav-router {
  text-decoration: none;
  color: black;
  font-size: 18px;
  transition-duration: 500ms;
  display: inline-block;
}
</style>
