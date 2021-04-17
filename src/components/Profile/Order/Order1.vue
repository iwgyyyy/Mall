<template>
<!-- 待收货的订单 -->
  <div class="order">
    <!-- 订单头字段 -->
    <Order-card-title></Order-card-title>
    <!-- 订单 -->
    <div class="order-show">
      <!-- 需要传入订单类型 商品名称和路径 收货信息和订单价格 还有三种时间以及订单号 -->
      <Order-card></Order-card>
      <Order-card></Order-card>
    </div>
  </div>
</template>

<script>
import OrderCardTitle from './Order_card_title'
import OrderCard from './Order_card'
export default {
  name: "Order1",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
  components:{
    OrderCard,
    OrderCardTitle
  }
};
</script>

<style>

</style>