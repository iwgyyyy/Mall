<template>
  <div class="order-details">
    <!-- 订单商品区域 -->
    <div class="order-details-goodslist">
      <!-- 商品头部 -->
      <div class="order-goodslist-title">
        <span>商品列表</span>
        <span style="color:red">总计:<b>{{totalPrice}}￥</b></span>
      </div>
      <!-- 商品主体 -->
      <div class="order-goodslist-main">
        <Shopping-cart-card :order_flag="showAddress"></Shopping-cart-card>
        <Shopping-cart-card :order_flag="showAddress"></Shopping-cart-card>
        <Shopping-cart-card :order_flag="showAddress"></Shopping-cart-card>
        <Shopping-cart-card :order_flag="showAddress"></Shopping-cart-card>
        <Shopping-cart-card :order_flag="showAddress"></Shopping-cart-card>
      </div>
    </div>
    <!-- 收货地址 -->
    <div class="order-details-address">
      <div class="order-details-address-main">
        <Receiving-address-card :order_flag='showAddress'></Receiving-address-card>
      </div>
      <!-- 按钮 -->
      <div class="order-details-address-button flex-y-center">
        <div>
          <el-button type="primary">使用收货地址</el-button>
        </div>
        <div>
          <el-button type="success" @click="showAddressForm=true">新增收货地址</el-button>
        </div>
      </div>
      <div class="order-details-address-button flex-y-center">
        <div>
          <el-button type="warning">付款</el-button>
        </div>
        <div>
          <el-button type="info" @click="back">返回</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 新增收货地址 -->
  <div v-show="showAddressForm" class="order-details-address-form">
    <Receiving-address-form @cancelAddressForm="showAddressForm=false"></Receiving-address-form>
  </div>
</template>

<script>
import ShoppingCartCard from '../Shoppingcart/Shopping_cart_card'
import ReceivingAddressCard from '../Receivingaddress/Receiving_address_card'
import ReceivingAddressForm from '../Receivingaddress/Receiving_address_form'
export default {
  name: "OrderDetails",
  created() {},
  data() {
    return {
      showAddress:false,
      showAddressForm:false,
      totalPrice:0,
    };
  },
  props: {},
  methods: {
    back(){
      history.go(-1)
    }
  },
  components:{
    ShoppingCartCard,
    ReceivingAddressCard,
    ReceivingAddressForm
  }
};
</script>

<style>
.order-details{
  position: absolute;
  left: 50%;
  width: 1000px;
  height: 880px;
  transform: translateX(-50%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
/* 订单商品区域 */
.order-details-goodslist{
  width: 100%;
  height: 75%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
/* 商品区域头部 */
.order-goodslist-title{
  height: 8%;
  width: 100%;
  background-color: rgb(245, 245, 245);
  font-size: 25px;
  padding-top: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  justify-content: space-between;
}
/* 商品区域主体 */
.order-goodslist-main{
  height: 92%;
  width: 100%;
  overflow-y: scroll;
}

/* 填写收货地址区域 */
.order-details-address{
  width: 100%;
  height: 25%;
  display: flex;
}
.order-details-address-main{
  width: 60%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.order-details-address-button{
  width: 20%;
  height: 100%;
  background-color: rgb(245, 245, 245);
}
/* 新增收货地址 */
.order-details-address-form{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>