<template>
  <div class="receiving-address">
    <!-- 显示地址 -->
    <div class="show-receiving-address">
      <Receiving-address-card @changeForm='modify' :order_flag="true"></Receiving-address-card>
    </div>
    <!-- 填充或修改地址表单 -->
    <transition name="el-zoom-in-top">
      <div class="fill-receiving-address" v-show="filladdress">
        <Receiving-address-form @cancelAddressForm="cancelForm" ref='form'></Receiving-address-form>
      </div>
    </transition>
    <!-- 增加地址按钮 -->
    <div class="add-receiving-address">
      <el-button type="primary" @click="showEmptyAddressForm">新增收货地址</el-button>
    </div>
  </div>
</template>

<script>
import ReceivingAddressCard from './Receiving_address_card'
import ReceivingAddressForm from './Receiving_address_form'
export default {
  name: "Receiving_address",
  created() {},
  data() {
    return {
      // 弹出填写地址表
      filladdress:false,
    };
  },
  props: {},
  methods: {
    // 添加新地址
    showEmptyAddressForm(){
      this.filladdress=true
      this.$refs.form.name=''
      this.$refs.form.phonenumber=''
      this.$refs.form.province=''
      this.$refs.form.city=''
      this.$refs.form.county_area=''
      this.$refs.form.selflocation=''
    },
    // 关闭表单
    cancelForm(){
      this.filladdress=false
    },
    // 修改当前地址的表单
    modify(personAddress){
      this.filladdress=true
      let x=personAddress.selflocation.split('-')
      this.$refs.form.name=personAddress.name
      this.$refs.form.phonenumber=personAddress.phone;//分号不能去  去了出错
      [ this.$refs.form.province,
        this.$refs.form.city,
        this.$refs.form.county_area]=x
      this.$refs.form.selflocation=personAddress.address
    }
  },
  components:{
    ReceivingAddressCard,
    ReceivingAddressForm
  }
};
</script>

<style>
.receiving-address{
  height: 100%;
  width: 100%;
  position: relative;
}
.show-receiving-address{
  height: 90%;
  width: 100%;
  overflow-y: scroll;
}
.fill-receiving-address{
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(117, 116, 116, 0.5);
}
.add-receiving-address{
  width: 100%;
  height: 10%;
  background-color: rgb(243, 243, 243);
}
.add-receiving-address button{
  margin: 1.5% 0 0 15%;
}
</style>