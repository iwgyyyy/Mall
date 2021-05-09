<template>
  <div class="order-details-address-card" @click="useCurrentAddress">
    <div style="position:absolute;left:5%;top:2%;" class="order-details-address-card-item">
      <i class="el-icon-user-solid"></i>
      <span>收货人</span>
    </div>
    <!-- 填写收货人 -->
    <b style="position:absolute;left:20%;top:2%;color:black;">
      {{address.consigneeName}}
    </b>
    <div style="position:absolute;left:50%;top:2%;" class="order-details-address-card-item">
      <i class="el-icon-mobile"></i>
      <span>收货号码</span>
    </div>
    <!-- 填写手机号码 -->
    <b style="position:absolute;left:65%;top:2%;color:black;">
      {{address.consigneeNumber}}
    </b>
    <div style="position:absolute;left:5%;top:38%;" class="order-details-address-card-item">
      <i class="el-icon-location-outline"></i>
      <span>收货地址</span>
    </div>
    <!-- 填写收货地址 -->
    <b style="position:absolute;left:20%;top:38%;color:black;">
      {{address.selfAddress.join('-')}}
    </b>
    <div style="position:absolute;left:5%;bottom:2%" class="order-details-address-card-item">
      <i class="el-icon-office-building"></i>
      <span>详细地址</span>
    </div>
    <!-- 填写详细地址 -->
    <b style="position:absolute;left:20%;bottom:2%;color:black;">
      {{address.selfLocation}}
    </b>
  </div>
</template>

<script>
export default {
  name: "OrderDetailsAddressCard",
  created() {},
  data() {
    return {};
  },
  props: {
    address:{
      type:Object,
    }
  },
  methods: {
    // 点击时就会将当前的地址传递给订单详情页面
    useCurrentAddress(){
      this.$emit('useCurrentAddress',this.address)
    }
  }
};
</script>

<style>
.order-details-address-card{
  font-size:15px;
  width:100%;
  position:relative;
  height:100px;
  overflow:hidden;
  color:#909399;
  transition-duration: 500ms;
  margin-bottom: 10px;
  background-color: rgb(250,250,250);
  border: .5px solid rgb(230,230,230);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 10px;
}
.order-details-address-card:hover{
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
.order-details-address-card-item{
  width: 80px;
  height: 22px;
}
</style>