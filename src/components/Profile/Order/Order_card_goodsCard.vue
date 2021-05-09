<template>
  <div class="order-card-goodscard">
    <img :src="require('D:/Project/thpetsmall/public/goodsImages/'+goods.showPictureAddress)" alt="#">
    <span>{{goods.name}}</span>
    <span>x{{goods.numbers}}</span>
    <span>小计{{goods.numbers*goods.price}}￥</span>
  </div>
</template>

<script>
export default {
  name: "OrderCardGoodsCard",
  created() {},
  data() {
    return {};
  },
  props: {
    goods:{
      type:Object
    }
  },
  methods: {},
};
</script>

<style>
.order-card-goodscard{
  width: 100%;
  height: min-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid rgb(245, 245, 245);
}
.order-card-goodscard img{
  width: 60px;
  height: 60px;
}
</style>