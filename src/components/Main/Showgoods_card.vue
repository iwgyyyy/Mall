<template>
  <div class="goods_card">
    <div class="goods_picture">
      <img src="../../assets/svg/medicine.svg" alt="#">
      <div class="goods_words">
        <article>
          这是一段介绍商品的文字。。。。lalalalalala
        </article>
      </div>
    </div>
    <div class="goods_message">
      <p>物品名称</p>
      <p>售价</p>
      <router-link to="">了解详情</router-link>
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
  width: 150px;
  height: 130px;
  transform: translateX(50%);
  transition-duration: 500ms;
}
/* 介绍文字或使用方法 */
.goods_words{
  width: 150px;
  transform: translateX(100%);
  transition-duration: 500ms;
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