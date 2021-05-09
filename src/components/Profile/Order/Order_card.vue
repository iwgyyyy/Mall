<template>
  <div class="order-card">
    <!-- 标题 -->
    <div class="order-card-title">
      <!-- 创建时间 -->
      <div style="margin:0 20% 0 5%">
        <span>{{timeType}}<b>{{time}}</b></span>
      </div>
      <!-- 订单号 -->
      <div>
        <span>订单号:<b>{{order['_id']}}</b></span>
      </div>
    </div>

    <!-- 显示订单 -->
    <div class="show-order-card">

      <!-- 商品 -->
      <div class="order-card-goods">
        <Order-card-goods-card
        v-for="item in order.goodsMessage"
        :goods="item"
        :key="item['_id']"
        ></Order-card-goods-card>
      </div>

      <!-- 订单状态 -->
      <div style="width:10%;border-right:1px solid #DCDFE6;">
        <p style="margin:40% auto auto 30%">{{orderState}}</p>
      </div>

      <!-- 收货信息 -->
      <div class="order-card-receive-message" v-if="order.receiveMessage">
        <div style="margin-left:5%">
          <span style="margin-right:5%">收货人:<b>{{order.receiveMessage.consigneeName}}</b></span>
          <span>手机:<b>{{order.receiveMessage.consigneeNumber}}</b></span>
        </div>
        <div style="margin-left:5%">
          <span>所在地区:<b>{{orderSelfAddress}}</b></span>
        </div>
        <div style="margin-left:5%">
          <span>详细地址:<b>{{order.receiveMessage.selfLocation}}</b></span>
        </div>
      </div>
      <div class="order-card-receive-message" v-else>
        <img 
        src="../../../assets/svg/mall/empty.svg" 
        style="width:100%;height:100%"
        alt="暂时没有填写地址...">
      </div>
      

      <!-- 订单价格 -->
      <div class="order-card-price">
        <p>{{order.totalPrice}}￥</p>
      </div>
      
      <!-- 操作按钮 -->
      <div style="width:10%;">
        <!-- 待收货订单 -->
        <div class="order-type-button" v-if='order.status==1||order.status==2'>
          <el-button type="primary" :disabled="order.status==1" @click="changeToHistoryOrder">确认收货</el-button>
        </div>
        <!-- 待支付订单 -->
        <div class="order-type-button" v-if='order.status==0'>
          <div>
            <el-button type="primary" @click="goToPaidPage">支付</el-button>
          </div>
          <div>
            <el-button type="info" @click="cancelOrder">取消</el-button>
          </div>
        </div>
        <!-- 历史订单 -->
        <div class="order-type-button" v-if='order.status==3'>
          <el-button type="danger" @click="deleteHistoryOrder">删除</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import OrderCardGoodsCard from './Order_card_goodsCard'
export default {
  name: "OrderCard",
  created() {},
  data() {
    return {};
  },
  props: {
    // 接收的订单
    order:{
      type:Object
    }
  },
  computed:{
    timeType(){
      switch(this.order.status){
        case 0: return '创建时间: '
        case 1: return '支付时间：'
        case 2: return '发货时间:'
        case 3: return '成交时间: '
      }
    },
    orderState(){
      switch(this.order.status){
        case 0:return '待支付'
        case 1:return '待发货'
        case 2:return '待收货'
        case 3:return '已完成'
      }
    },
    time(){
      switch(this.order.status){
        case 0:return this.order.createTime
        case 1:return this.order.payTime
        case 2:return this.order.deliverTime
        case 3:return this.order.finishTime
      }
    },
    orderSelfAddress(){
      if(this.order.receiveMessage.length!==0){
        return this.order.receiveMessage.selfAddress.join('-')
      }else{
        return 
      }
    },
  },
  methods: {
    // 取消订单 --待支付
    cancelOrder(){
      // 取消订单 是删除该订单
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发送请求 删除订单
          axios({
            method:'post',
            baseURL:'http://localhost:3000',
            url: '/deleteWaitForPaidOrder',
            data: {
              id:this.order['_id']
            }
          }).then(res=>{
            if(res.status==200){
              this.$message.success("删除成功！")
              this.$emit('updateOrder')
            } 
            else this.$message.error("删除失败....")
          }).catch(err=>{
            console.log(err);
          })
        }).catch(() => {
          this.$message.warning("已取消");
        });
    },
    // 支付订单 --待支付
    goToPaidPage(){
      const goodsList=this.order.goodsMessage.map(value=>JSON.stringify(value))
      const orderId=this.order['_id']
      const receiveMessage=JSON.stringify(this.order.receiveMessage)
      if(receiveMessage==="{}"){
        this.$router.push({path:'/order_details',query:{goodsList,orderId}})
      }else{
        this.$router.push({path:'/order_details',query:{goodsList,orderId,receiveMessage}})
      }
    },
    // 确认收货 --待收货
    changeToHistoryOrder(){
      if(this.order.status==1){
        this.$message.warning('商家还未发货。。')
        return 
      }
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/changeToHistoryOrder',
        data: {
          id:this.order['_id']
        }
      }).then(res=>{
        if(res.status==200){
          this.$message.success('确认收货成功！')
          this.$emit('changeToHistoryOrder')
        }else{
          this.$message.error("确认收货失败。。。")
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 删除订单 --历史订单
    deleteHistoryOrder(){
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(()=>{
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/deleteCustomerHistoryOrder',
          data: {
            id:this.order['_id']
          }
        }).then(res=>{
          if(res.status==200){
            this.$message.success('删除成功！')
            this.$emit('deleteOrder')
          }else{
            this.$message.error('删除失败...')
          }
        }).catch(err=>{
          console.log(err);
        })
      }).catch(()=>{
        this.$message.info('已取消')
      })
    }

  },
  components:{
    OrderCardGoodsCard
  },
};
</script>

<style>
.order-card{
  width: 100%;
  height: 25%;
  border: 2px solid #DCDFE6;
  box-sizing: border-box;
  margin-bottom: 0.5%;
}
/* 订单头 */
.order-card-title{
  width: 100%;
  height: 25%;
  background-color: rgb(250, 250, 250);
  display: flex;
  align-items: center;
}
/* 订单卡片内容 */
.show-order-card{
  height: 75%;
  width: 100%;
  display: flex;
}
/* 商品详情 可以点击 */
.order-card-goods{
  width:40%;
  display: flex;
  flex-wrap: wrap;
  border-right: 1px solid #DCDFE6;
  overflow-y: scroll;
  overflow-x: hidden;
}
.order-card-goods a{
  text-decoration: none;
  color: black;
}
.order-card-goods a:hover{
  text-decoration: underline;
  color: cornflowerblue;
}
/* 收货信息 */
.order-card-receive-message{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width:30%;
  border-right:1px solid #DCDFE6;
}
/* 订单价格 */
.order-card-price{
  width:10%;
  border-right:1px solid #DCDFE6;
  text-align: center;
  padding-top: 30px;
}
/* 操作按钮 */
.order-type-button{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>