<template>
  <div class="shopping-cart-card">
    <!-- 相当于每个商品的选中按钮 -->
    <div v-show='order_flag' style="margin:0 2.5% 0 2.5%">
      <input type="checkbox" :checked='flag' @click="isChecked" :key="goods.goodsId">
    </div>

    <!-- 商品 -->
    <div class="shopping-cart-card-goods">
      <!-- 后续仍需修改 路由的跳转需要冒泡到div上 -->
      <img :src="goods.img_route" alt="#">
      <router-link to="">{{goods.name}}</router-link>
    </div>

    <!-- 单价 -->
    <div class="shopping-cart-card-price">
    <span>{{prices}}</span>
    </div>

    <!-- 数量 -->
    <div v-show='order_flag' style="margin-right: 2.8%;">
       <el-input-number v-model="goods.number" :min="1" size="small" @change="changeNumber"></el-input-number>
    </div>
    <div v-show="!order_flag" style="margin:0 5% 0 6%;">
      <span>数量*{{goods.number}}</span>
    </div>

    <!-- 小计 -->
    <div class="shopping-cart-card-totalprice">
      <b>￥{{totalprice}}</b>
    </div>

    <!-- 操作 -->
    <div v-show='order_flag'>
      <el-button type="danger" icon="el-icon-delete" circle @click="deleteself"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shopping_cart_card",
  created() {},
  beforeUnmount(){
    if(this.flag)
    this.$emit('getPrice',this.totalprice,false)
  },
  data() {
    return {
      flag:false,
      beforeTotalPrice:0,
    };
  },
  props: {
    goods:{
      type:Object,
      default:{
        goodsId:-1,
        name:'折耳猫',
        img_route:require("../../../assets/svg/pets-cat1.svg"),
        price:10,
        number:100
      },
    },
    order_flag:{
        type:Boolean,
        default:true
      }
  },
  computed:{
    prices(){
      return this.goods.price+"￥"
    },
    totalprice(){
      return this.goods.price*this.goods.number
    }
  },
  watch:{
    // 监听flag属性 如果flag改变 则应该触发当前事件
    flag:function(){
      this.$emit('getPrice',this.totalprice,this.flag)
    }
  },
  methods: {
    // 当前项是否被选中
    isChecked(){
      this.flag=!this.flag
    },
    // 删除按钮
    deleteself(){
      this.$emit('getSelf',this.goods.goodsId)
    },
    // 改变购物车商品数量
    changeNumber(currentValue,oldValue){
      if(this.flag){  
        this.$emit("getPrice",(currentValue-oldValue)*this.goods.price,this.flag)
      }
    }
  },
};
</script>

<style>
.shopping-cart-card{
  height: 120px;
  border-bottom:inset;
  display: flex;
  align-items: center;
}
/* 商品详情页 */
.shopping-cart-card-goods{
  height: 100%;
  width: 30%;
  margin-right: 18.5%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.shopping-cart-card-goods img{
  height: 100%;
}
.shopping-cart-card-goods a{
  margin-left:10%;
  text-decoration: none;
  color: black;
}
/* 商品单价 */
.shopping-cart-card-price{
  width: 120px;
  text-align: center;
  margin-right: 3.5%;
}
/* 商品小计 */
.shopping-cart-card-totalprice{
  width: 120px;
  text-align: center;
  margin-right: 5%;
}
</style>  