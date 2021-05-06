<template>
  <div class="souvenir_card">
    <div class="souvenir_message">
      <p>{{souvenir.selfClass}}</p>
      <p>{{souvenir.price}}￥</p>
      <router-link :to="souvenirDetails">了解详情</router-link>
    </div>
    <div class="souvenir_picture">
      <img :src="require('D:/Project/thpetsmall/public/goodsImages/'+souvenir.showPictureAddress)" alt="#">
    </div>
    <div v-show='flag' class="souvenir_button">
      <button style="background:gold;color:black">
        <img src="../../assets/svg/buy.svg" alt="#">
        <span>购买</span>
      </button>
      <button style="background:cornflowerblue;color:black">
        <img src="../../assets/svg/add_to_cart.svg" alt="#">
        <span>加入购物车</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Showsouvenir_card",
  created() {},
  data() {
    return {
    };
  },
  props: {
    flag:{
      type:Boolean,
      default:false,
    },
    souvenir:Object,//传入图片地址 商品名称 售价
  },
  methods: {},
  computed:{
    souvenirDetails(){
      return {
        path:"/goods_details",
        query:this.souvenir
      }
    }
  }
};
</script>

<style>
.souvenir_card{
  width: 300px;
  height: min-content;
  margin-right: 2%;
  margin-top: 1%;
  transition-duration: 500ms;
  color:black;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.souvenir_card:hover{
  box-shadow: 10px 10px 10px rgba(0,0,0,0.5);
}
.souvenir_message{
  height: 65px;
  background-color: rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.souvenir_message a{
  text-decoration: none;
  color:black;
}
.souvenir_message a:hover{
  text-decoration: underline;
  color: cornflowerblue;
}
.souvenir_picture{
  height: 210px;
  text-align: center;
}
.souvenir_picture img{
  width: 250px;
  height: 200px;
}
.souvenir_button{
  display: flex;
  justify-content: space-evenly;
}
.souvenir_button button{
  width: 120px !important;
  height: 35px !important;
  font-size: 15px;
  border:none;
  border-radius: 4px;
  cursor: pointer;
}
.souvenir_button img{
  width: 20px;
  vertical-align: bottom;
}
.souvenir_button button:hover{
  opacity: 0.7;
}
</style>