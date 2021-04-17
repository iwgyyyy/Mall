<template>
  <div class="search_box">
    <input type="text" class="search_box_text">
    <button class="search_box_button">
      <img src="../../assets/svg/search_button.svg" alt="" class="search_box_img">
    </button>
  </div>
</template>

<script>
export default {
  name: "Search_box",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style>
.search_box{
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search_box_button{
  outline: none !important;
  border: none !important;
  z-index: 97 !important;
  background-color: transparent !important;
}
.search_box_img{
  width: 29px;
  height: 29px;
  vertical-align: middle;
  margin: 0;
  padding: 0;
}
.search_box_text{
  width: 0px;
  height: 35px;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  transition-duration: 500ms;
}
.search_box:hover .search_box_text,
.search_box:focus .search_box_text,
.search_box_text:focus{
  width: 300px;
}

</style>