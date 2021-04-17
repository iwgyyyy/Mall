<template>
  <!-- 历史订单订单 -->
  <div class="order">
    <!-- 订单头字段 -->
    <Order-card-title></Order-card-title>
    <!-- 订单 -->
    <div class="order-show">
      <Order-card orderType='3'></Order-card>
      <Order-card orderType='3'></Order-card>
    </div>
  </div>
</template>

<script>
import OrderCardTitle from './Order_card_title'
import OrderCard from './Order_card'
export default {
  name: "Order3",
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

<style></style>