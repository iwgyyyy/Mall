<template>
  <div class="index">
    <!-- 轮播图 -->
    <div class="carousel-map">
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="item in carousel_imgs" :key="item">
            <img :src="item" alt="#">
          </el-carousel-item>
        </el-carousel>
    </div>

    <div class="title">
      <p>宠物商城</p>
    </div>

    <!-- 宠物商城的一些卡片 -->
    <div class='carousel-map'>
      <Show-pets-mall></Show-pets-mall>
    </div>

    <div class="title">
      <p>宠物用品</p>
    </div>

    <!-- 宠物用品 -->
    <div class="carousel-map">
      <Show-pets-goods></Show-pets-goods>
    </div>

    <div class="title">
      <p>周边</p>
    </div>

    <!-- 宠物周边 -->
    <div class="carousel-map">
      <Show-pets-souvenir></Show-pets-souvenir>
    </div>
  </div>
</template>

<script>
import ShowPetsMall from '../../components/Main/Showpets_mall'
import ShowPetsGoods from '../../components/Main/Showpets_goods'
import ShowPetsSouvenir from '../../components/Main/Showpets_souvenir'

export default {
  name: "Main",
  created() {},
  data() {
    return {
      // 轮播图图片地址
      carousel_imgs:[
        require('../../assets/images/carousel-1.jpg'),
        require('../../assets/images/carousel-2.jpg'),
        require('../../assets/images/carousel-3.jpg'),
        require('../../assets/images/carousel-4.jpg'),
        require('../../assets/images/carousel-5.jpg'),
        require('../../assets/images/carousel-6.jpg'),
      ]
    };
  },
  props: {},
  methods: {},
  components:{
    ShowPetsMall,
    ShowPetsGoods,
    ShowPetsSouvenir
  }
};
</script>

<style>
/* 主div布局 */
.index{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px;
}
/*  标题文字  */
.title{
  margin-left:10%;
  color:#303133;
  font-size:25px
}
/* 轮播图父级div */
.carousel-map{
  margin-bottom: 80px;
  width: 80%;
  padding-left: 10%;
}
/* 轮播图开始 */

  .el-carousel__item img{
    width: 600px; 
    height: 350px;
  }
  /* 轮播图结束 */
/* 宠物商城调用轮播图父级样式 */

  /* 宠物用品调用轮播图父级样式*/

</style>