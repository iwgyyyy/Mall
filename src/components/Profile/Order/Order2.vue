<template>
  <!-- 待支付的订单 -->
  <div class="order">
    <!-- 订单头字段 -->
    <Order-card-title></Order-card-title>
    <!-- 订单 -->
    <div class="order-show" v-show="!isEmpty" v-loading="order_list.length===0">
      <Order-card
      v-for="item in order_list"
      :key="item['_id']"
      :order="item"
      @updateOrder="getAllWaitForPaidOrder">
      </Order-card>
    </div>
    <el-empty
    class="order-show"
    description="暂时没有待支付的订单。。" 
    v-show="isEmpty">
    </el-empty>
  </div>
</template>

<script>
import axios from 'axios'
import OrderCardTitle from './Order_card_title'
import OrderCard from './Order_card'
export default {
  name: "Order2",
  created() {
    this.getAllWaitForPaidOrder()
  },
  data() {
    return {
      // 未支付的订单
      order_list:[],
      isEmpty:false
    };
  },
  props: {},
  methods: {
    // 获得所有的未支付订单
    getAllWaitForPaidOrder(){
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/getWaitForPaidOrder',
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

<style></style>