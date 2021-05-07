<template>
  <div class="mall-card">
    <!-- 图片 -->
    <div class="mall-card-img">
      <img :src="require('D:/Project/thpetsmall/public/goodsImages/'+goods.showPictureAddress)" alt="#">
    </div>
    <!-- 文字 -->
    <div class="flex-center" style="height:30px">
      <span>{{goods.selfClass}}</span>
      <span>{{goods.price}}￥</span>
    </div>
    <!-- 按钮 -->
    <div class="flex-center" style="margin-top:15px">
      <el-button type="primary" @click="addToShoppingCart">加入购物车</el-button>
      <el-button type="warning" @click="goToGoodsDetails">购买</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: "Mall_card",
  created() {},
  data() {
    return {};
  },
  props: {
    goods:{
      type:Object
    }
  },
  methods: {
    addToShoppingCart(){
      if(!this.$store.state.account){
        ElMessage.warning('请先登录')
      }else{
        ElMessage.success('加入成功！')
      }
    },
    goToGoodsDetails(){
      this.$router.push({
        path:'/goods_details',
        query:this.goods
      })
    }
  },
};
</script>

<style>
.mall-card{
  width: 280px;
  height: 300px;
  background-color: yellow;
  margin: .5% .8% 1% .5%;
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
/* 图片div */
.mall-card-img{
  height: 200px;
  width: 100%;
  /* background-color: royalblue; */
  text-align: center;
}
.mall-card-img img{
  height: 200px;
  width: 280px;
}

</style>