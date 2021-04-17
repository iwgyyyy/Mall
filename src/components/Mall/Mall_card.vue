<template>
  <div class="mall-card">
    <!-- 图片 -->
    <div class="mall-card-img">
      <img src="../../assets/svg/buy.svg" alt="#">
    </div>
    <!-- 文字 -->
    <div class="flex-center" style="height:30px">
      <span>物品名称</span>
      <span>价格</span>
    </div>
    <!-- 按钮 -->
    <div class="flex-center" style="margin-top:15px">
      <el-button type="primary">加入购物车</el-button>
      <el-button type="warning">购买</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mall_card",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
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