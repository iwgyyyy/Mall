<template>
  <div class="order-card">
    <!-- 标题 -->
    <div class="order-card-title">
      <!-- 创建时间 -->
      <div style="margin:0 20% 0 5%">
        <span>{{timeType}}<b>2020-01-01</b></span>
      </div>
      <!-- 订单号 -->
      <div>
        <span>订单号:<b>35632532</b></span>
      </div>
    </div>

    <!-- 显示订单 -->
    <div class="show-order-card">

      <!-- 商品 -->
      <div class="order-card-goods">
        <div style="width:20%" v-for="item in [1,2,3,4,5,6,7]" :key=item>
          <router-link to="">哈士奇</router-link>
        </div>
      </div>

      <!-- 订单状态 -->
      <div style="width:10%;border-right:1px solid #DCDFE6;">
        <p style="margin:40% auto auto 30%">{{orderState}}</p>
      </div>

      <!-- 收货信息 -->
      <div class="order-card-receive-message">
        <div style="margin-left:5%">
          <span style="margin-right:5%">收货人:<b>刘旺子</b></span>
          <span>手机:<b>13838380438</b></span>
        </div>
        <div style="margin-left:5%">
          <span>所在地区:<b>湖北省-武汉市-东湖区</b></span>
        </div>
        <div style="margin-left:5%">
          <span>详细地址:<b>软件光华小区</b></span>
        </div>
      </div>

      <!-- 订单价格 -->
      <div class="order-card-price">
        <p>10000￥</p>
      </div>
      
      <!-- 操作按钮 -->
      <div style="width:10%;">
        <!-- 待收货订单 -->
        <div class="order-type-button" v-if='orderType=="1"'>
          <el-button type="primary">确认收货</el-button>
        </div>
        <!-- 待支付订单 -->
        <div class="order-type-button" v-if='orderType=="2"'>
          <div>
            <el-button type="primary">支付</el-button>
          </div>
          <div>
            <el-button type="info">取消</el-button>
          </div>
        </div>
        <!-- 历史订单 -->
        <div class="order-type-button" v-if='orderType=="3"'>
          <el-button type="danger">删除</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "OrderCard",
  created() {},
  data() {
    return {};
  },
  props: {
    orderType:{
      type:String,
      default:'1',
    }
  },
  computed:{
    timeType(){
      switch(this.orderType){
        case '1': return '支付时间: '
        case '2': return '创建时间: '
        case '3': return '成交时间: '
      }
    },
    orderState(){
      switch(this.orderType){
        case '1':return '待收货'
        case '2':return '待支付'
        case '3':return '已完成'
      }
    }
  },
  methods: {},
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
  align-items: center;
  border-right: 1px solid #DCDFE6;
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