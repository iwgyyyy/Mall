<template>
<!-- 卡片展示 -->
  <div class="pets_card">
    <!-- 卡片展示图片 -->
    <div class='pets_picture'>
      <img :src="pet.showPictureAddress" alt="#">
    </div>
    <!-- 卡片展示文字介绍等 -->
    <div class='pets_words'>
      <!-- 宠物信息 -->
      <div class="pets_message">
        <p>{{pet.subject}}</p>
        <p>{{pet.age}}</p>
        <p>{{pet.sex}}</p>
      </div>
      <!-- 隐藏的链接 -->
      <div class="hidden-route">
        <router-link :to="'/goods_details/'">了解详情</router-link>
        <router-link to="">查看全部</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Showpets_card",
  created() {

  },
  data() {
    return {

    };
  },
  props: {
    pet:{
      type:Object,
    },
  },
  methods: {},
};
</script>

<style>
/* 卡片样式 */
.pets_card{
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  transition-duration: 500ms;
  border-radius: 5px;
  margin-right: 2%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
/* 卡片hover时的变动 */
.pets_card:hover{
  box-shadow: 10px 10px 10px rgba(0,0,0,0.5);
}
.pets_card:hover :nth-child(1){
  height: 150px;
}
.pets_card:hover :nth-child(2){
  height: 110px;
}
.pets_card:hover :nth-child(1) img{
  height: 140px;
}

.pets_card:hover :nth-child(2) .pets_message{
  height: 70px;
}
.pets_card:hover p{
  font-size: 14px;
}
.pets_card:hover :nth-child(2) .hidden-route{
  height: 40px;
}

/* 图片div的样式 */
.pets_picture{
  height: 180px;
  transition-duration: 500ms;
}
.pets_picture img{
  width: 200px;
  height: 180px;
  transition-duration: 500ms;
}
/* 文字div的样式 */
.pets_words{
  width: 200px;
  height: 70px;
  transition-duration: 500ms;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.03);
}

/* 宠物信息div */
.pets_message{
  width: 200px;
  height: 70px;
  transition-duration: 500ms;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
}
.pets_message p{
  font-size: 17px;
  transition-duration: 500ms;
  color:black;
}
/* 隐藏的链接 */
.hidden-route{
  width: 200px;
  height: 40px;
  margin: 0;
  display: flex;
  justify-content: space-evenly;
}
.hidden-route a{
  text-decoration: none;
  color: black;
}
.hidden-route a:hover{
  color: cornflowerblue;
  text-decoration:underline;
}
</style>