<template>
  <div class="order-title">
    <span style="margin:0 30% 0 5%">订单详情</span>
    <span style="margin-right:7%">订单状态</span>
    <span style="margin-right:23%">收货信息</span>
    <span style="margin-right:5%">订单价格</span>
    <span>操作</span>
  </div>
</template>

<script>
export default {
  name: "OrderCardTitle",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style>
.order-title{
  width: 100%;
  height: 8%;
  background-color: rgb(240, 240, 240);
  display: flex;
  align-items: center;
}
</style>