<template>
  <div class="receiving-address">
    <!-- 显示地址 -->
    <div class="show-receiving-address" v-show="!isEmpty">
      <Receiving-address-card
      v-for="item in address_list"
      :address="item"
      :key="item['_id']"
      @changeForm='modify' 
      @flushAddress="getAllAddress"
      :order_flag="true">
      </Receiving-address-card>
    </div>
    <div class="show-receiving-address" v-show="isEmpty">
      <img src="../../../assets/svg/mall/empty.svg" style="width:100%;height:90%">
    </div>
    <!-- 填充或修改地址表单 -->
    <transition name="el-zoom-in-top">
      <div class="fill-receiving-address" v-show="filladdress">
        <Receiving-address-form 
        @cancelAddressForm="cancelForm" 
        ref='form'
        @flushAddress="getAllAddress">
        </Receiving-address-form>
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
import axios from 'axios'
export default {
  name: "Receiving_address",
  created() {
    this.getAllAddress()
  },
  data() {
    return {
      // 弹出填写地址表
      filladdress:false,
      // 保存地址信息
      address_list:[],
      isEmpty:false,//判断是否有地址
    };
  },
  props: {},
  methods: {
    // 获得地址数据
    getAllAddress(){
      axios({
        method:'post',
        baseURL:"http://localhost:3000",
        url: "/getAllAddress",
        data: {
          userAccount:this.$store.state.account
        }
      }).then(res=>{
        if(res.data==1){
          this.isEmpty=true
        }else{
          this.isEmpty=false
          this.address_list=res.data
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 添加新地址
    showEmptyAddressForm(){
      this.filladdress=true
    },
    // 关闭表单
    cancelForm(){
      this.filladdress=false
    },
    // 修改当前地址的表单
    modify(address){
      this.filladdress=true
      this.$refs.form.name=address.consigneeName
      this.$refs.form.phonenumber=address.consigneeNumber;//分号不能去  去了出错
      [ this.$refs.form.province,
        this.$refs.form.city,
        this.$refs.form.county_area]=address.selfAddress
      this.$refs.form.selfLocation=address.selfLocation
      this.$refs.form.addressId=address['_id']
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