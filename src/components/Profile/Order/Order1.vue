<template>
<!-- 待收货的订单 -->
  <div class="order">
    <!-- 订单头字段 -->
    <Order-card-title></Order-card-title>
    <!-- 订单 -->
    <div class="order-show" v-show="!isEmpty" v-loading="order_list.length===0">
      <Order-card
      v-for="item in order_list"
      :key="item['_id']"
      :order="item"
      @changeToHistoryOrder="getAllWaitForReceivingOrder"
      ></Order-card>
    </div>
    <el-empty
    class="order-show"
    description="暂时没有待收货的订单。。" 
    v-show="isEmpty">
    </el-empty>
  </div>
</template>

<script>
import axios from 'axios'
import OrderCardTitle from './Order_card_title'
import OrderCard from './Order_card'
export default {
  name: "Order1",
  created() {
    this.getAllWaitForReceivingOrder()
  },
  data() {
    return {
      order_list:[],
      isEmpty:false
    };
  },
  props: {},
  methods: {
    // 获取所有待收货的订单
    getAllWaitForReceivingOrder(){
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: "/getWaitForDeliver",
        data: {
          account:this.$store.state.account
        }
      }).then(res=>{
        this.order_list=res.data
        if(this.order_list.length===0){
          this.isEmpty=true
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  },
  components:{
    OrderCard,
    OrderCardTitle
  }
};
</script>

<style>

</style>