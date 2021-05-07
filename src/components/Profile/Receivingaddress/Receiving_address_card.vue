<template>
<!-- 收货人 所在地区 地址 手机 -->
<!-- 修改 删除 -->
  <div class="Receiving-address-card">
    <!-- 文字显示 -->
    <div class="Receiving-address-card-text">
      <div style="margin-left:5%">
        <span style="margin-right:5%">收货人:<b>{{address.consigneeName}}</b></span>
        <span>手机:<b>{{address.consigneeNumber}}</b></span>
      </div>
      <div style="margin-left:5%">
        <span>
          所在地区:
          <b>
            {{address.selfAddress[0]}} {{address.selfAddress[1]}} {{address.selfAddress[2]}}
          </b>
        </span>
      </div>
      <div style="margin-left:5%">
        <span>详细地址:<b>{{address.selfLocation}}</b></span>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="Receiving-address-card-button" v-show="order_flag">
      <div>
        <el-button type="primary" icon="el-icon-edit" circle @click="rewrite"></el-button>
      </div>
      <div>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteAddress"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus';
export default {
  name: "ReceivingAddressCard",
  created() {},
  data() {
    return {};
  },
  props: {
    address:{
      type:Object
    },
    // 若用在订单详情页面，则需传入order_flag，不展示按钮
    order_flag:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    rewrite(){
      this.$emit('changeForm',this.address)
    },
    deleteAddress(){
      if(confirm('您确定要删除该地址吗')){
        axios({
          method:'post',
          baseURL:"http://localhost:3000",
          url: "/deleteAddress",
          data: {
            id:this.address['_id']
          }
        }).then(res=>{
          if(res.status==200){
            this.$emit('flushAddress')
            ElMessage.success('删除成功！')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
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