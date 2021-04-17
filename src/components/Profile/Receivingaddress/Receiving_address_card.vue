<template>
<!-- 收货人 所在地区 地址 手机 -->
<!-- 修改 删除 -->
  <div class="Receiving-address-card">
    <!-- 文字显示 -->
    <div class="Receiving-address-card-text">
      <div style="margin-left:5%">
        <span style="margin-right:5%">收货人:<b>{{personAddress.name}}</b></span>
        <span>手机:<b>{{personAddress.phone}}</b></span>
      </div>
      <div style="margin-left:5%">
        <span>所在地区:<b>{{personAddress.selflocation}}</b></span>
      </div>
      <div style="margin-left:5%">
        <span>详细地址:<b>{{personAddress.address}}</b></span>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="Receiving-address-card-button" v-show="order_flag">
      <div>
        <el-button type="primary" icon="el-icon-edit" circle @click="rewrite"></el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReceivingAddressCard",
  created() {},
  data() {
    return {};
  },
  props: {
    personAddress:{
      type:Object,
      default:{
        name:'刘旺子',
        selflocation:'湖北省-武汉市-东湖区',
        address:'光华软件中心',
        phone:'138****0438',
      }
    },
    // 若用在订单详情页面，则需传入order_flag，不展示按钮
    order_flag:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    rewrite(){
      this.$emit('changeForm',this.personAddress)
    }
  },
};
</script>

<style>
/* 总的收货地址卡片 */
.Receiving-address-card{
  width: 100%;
  height: 220px;
  display: flex;
  background-color: rgb(250,250,250);
  border: 1px solid rgb(230,230,230);
  box-sizing: border-box;
}
/* 文字区域的div */
.Receiving-address-card-text{
  width: 92%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.Receiving-address-card-button{
  height: 100%;
  width: 8%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

</style>