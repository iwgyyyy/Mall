<template>
  <div class="goods_card" >
    <div class="goods_picture">
      <img :src="require('D:/Project/thpetsmall/public/goodsImages/'+goods.showPictureAddress)" alt="#">
      <div class="goods_words">
        <article>
          {{goods.decscription}}
        </article>
      </div>
    </div>
    <div class="goods_message">
      <p>{{goods.selfClass}}</p>
      <p>{{goods.price}}￥</p>
      <router-link :to="petsGoodsDetails">了解详情</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Showgoods_card",
  created() {},
  data() {
    return {};
  },
  props: {
    goods:Object//内部有介绍或使用的属性，物品名称属性，售价，还有商品图片地址
  },
  methods: {},
  computed:{
    petsGoodsDetails(){
      let route={
        path:'/goods_details',
        query:this.goods
      }
      return route
    }
  }
};
</script>

<style>
.goods_card{
  width: 300px;
  height: 200px;
  margin-right: 2%;
  overflow: hidden;
  transition-duration: 500ms;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.goods_card:hover{
  box-shadow: 10px 10px 10px rgba(0,0,0,0.5);
}
.goods_card:hover .goods_picture img{
  transform: translateX(0%);
}
.goods_card:hover .goods_words {
  transform: translateX(0%);
}
/* 展示图片和介绍文字的div */
.goods_picture{
  height: 150px;
  display: flex;
}
/* 图片 */
.goods_picture img{
  width: 100%;
  height: 100%;
  transform: translateX(50%);
  transition-duration: 500ms;
}
/* 介绍文字或使用方法 */
.goods_words{
  width: 150px;
  transform: translateX(100%);
  transition-duration: 500ms;
  overflow:hidden;
}
/* 物品信息 即下面的div */
.goods_message{
  height: 50px;
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color:black;
}

.goods_message a{
  text-decoration: none;
  color:black;
}
.goods_message a:hover{
  color: cornflowerblue;
  text-decoration:underline;
}
</style>