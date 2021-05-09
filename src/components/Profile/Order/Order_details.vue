<template>
  <div class="order-details">
    <!-- 订单商品区域 -->
    <div class="order-details-goodslist">
      <!-- 商品头部 -->
      <div class="order-goodslist-title">
        <span>商品列表</span>
        <span>订单号:{{orderId}}</span>
        <span style="color:red">总计:<b>{{totalPrice}}￥</b></span>
      </div>
      <!-- 商品主体 -->
      <div class="order-goodslist-main">
        <Shopping-cart-card
        v-for="item in goodsList"
        :goods="item"
        :key="item['_id']"
        :order_flag="false"
        ></Shopping-cart-card>
      </div>
    </div>
    <!-- 收货地址 -->
    <div class="order-details-address">
      <div class="order-details-address-main" v-show="!isCurrentAddress">
        <div class="flex-y-center">
          <div><i class="el-icon-user-solid"></i>收货人</div>
          <div><i class="el-icon-mobile"></i>收货号码</div>
          <div><i class="el-icon-location-outline"></i>收货地址</div>
          <div><i class="el-icon-office-building"></i>详细地址</div>
        </div>
        <div class="flex-y-center" style="align-items:start">
          <div>{{currentAddress.consigneeName}}</div>
          <div>{{currentAddress.consigneeNumber}}</div>
          <div>{{orderSlefAddress}}</div>
          <div>{{currentAddress.selfLocation}}</div>
        </div>
      </div>
      <el-empty 
      class="order-details-address-main"
      v-show='isCurrentAddress'
      description="尚未选择地址。。"
      ></el-empty>
      <!-- 按钮 -->
      <div class="order-details-address-button flex-y-center">
        <div><el-button type="primary" @click="useAddress">使用收货地址</el-button></div>
        <div><el-button type="success" @click="addAddress">新增收货地址</el-button></div>
      </div>
      <div class="order-details-address-button flex-y-center">
        <div><el-button type="warning" @click="paid">付款</el-button></div>
        <div><el-button type="info" @click="back">返回</el-button></div>
      </div>
    </div>
  </div>
  <!-- 新增收货地址 -->
  <el-dialog title="填写收货地址" v-model="showFormAddress" width="30%">
    <div class="order-details-address-form">
      <el-input 
      placeholder="请输入收货人姓名" 
      prefix-icon="el-icon-user-solid"
      v-model="newFormAddress.consigneeName"
      style="width:300px">
      </el-input>
      <el-input 
      placeholder="请输入收货人手机号" 
      prefix-icon="el-icon-mobile"
      v-model="newFormAddress.consigneeNumber"
      style="width:300px">
      </el-input>
      <div>
        <el-input 
        placeholder="省名" 
        v-model="newFormAddress.province"
        prefix-icon="el-icon-location-outline" 
        style="width:100px">
        </el-input> -
        <el-input 
        placeholder="市名" 
        style="width:100px" 
        v-model="newFormAddress.city">
        </el-input> - 
        <el-input 
        placeholder="县名或区名" 
        style="width:100px" 
        v-model="newFormAddress.county_area">
        </el-input>
      </div>
      <el-input 
      prefix-icon="el-icon-office-building"
      placeholder="请输入详细地址" 
      style="width:500px"
      v-model="newFormAddress.selfLocation">
      </el-input>
      <div class="flex-center">
        <el-button type='primary' @click="saveFormAddress">保存</el-button>
        <el-button type='info' @click="resetFormAddress">重置</el-button>
      </div>
    </div>
  </el-dialog>
  <!-- 查询用户已有的收货地址 -->
  <el-dialog title="选择收货地址" v-model="showAddress">
    <div v-show='!isAddressEmpty'>
      <Order-details-address-card
      v-for="item in address_list"
      :key="item['_id']"
      :address="item"
      @useCurrentAddress="getCurrentAddress"
      ></Order-details-address-card>
    </div>
    <el-empty 
    v-show='isAddressEmpty'
    description="暂未找到地址。。"
    ></el-empty>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import ShoppingCartCard from '../Shoppingcart/Shopping_cart_card'
import OrderDetailsAddressCard from './Order_details_addressCard'
export default {
  name: "OrderDetails",
  created() {
    this.goodsList=this.$route.query.goodsList.map(value=>{
      return JSON.parse(value)
    })
    this.orderId=this.$route.query.orderId
    this.currentAddress=this.$route.query.receiveMessage?JSON.parse(this.$route.query.receiveMessage):{}
  },
  data() {
    return {
      // 订单商品的数组
      goodsList:[],
      // 订单的id
      orderId:'',
      // 新增收货地址的flag
      showFormAddress:false,
      // 查询用户的收货地址的flag
      showAddress:false,
      // 存放查询到的用户地址
      address_list:[],
      // 判断用户是否有存地址
      isAddressEmpty:false,
      // 用户当前订单用的地址
      currentAddress:{},
      // 用户新建的地址
      newFormAddress:{
        consigneeName:'',
        consigneeNumber:'',
        province:'',
        city:'',
        county_area:'',
        selfLocation:''
      }
    };
  },
  props: {},
  methods: {
    back(){
      history.go(-1)
    },
    // 用户自己新增地址
    addAddress(){
      this.showFormAddress=true
    },
    // 查询用户自己的地址
    async useAddress(){
      await axios({
        method:'post',
        baseURL:"http://localhost:3000",
        url: "/getAllAddress",
        data: {
          userAccount:this.$store.state.account
        }
      }).then(res=>{
        this.showAddress=true
        if(res.data==1){
          this.isAddressEmpty=true
        }else{
          this.isAddressEmpty=false
          this.address_list=res.data
        }
      }).catch(err=>{
        console.log(err);
      })

    },
    // 将用户的地址信息保存至当前订单的地址信息中
    keepOrderAddress(){
      return axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/keepOrderAddress',
        data: {
          id:this.orderId,
          receiveMessage:this.currentAddress
        }
      }).then(res=>{
        if(res.status==200){
          this.$message.success('修改地址信息成功！')
        }else{
          this.$message.error("修改地址出错...")
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 得到用户选择的自己的地址
    async getCurrentAddress(address){
      this.currentAddress=address
      this.showAddress=false
      // 将用户自己的选择的地址保存至该订单中
      await this.keepOrderAddress()
    },
    // 监听用户填写地址表单是否关闭 若关闭则将其内部的数据都清零s
    clearFormAddressData(currentVaule){
      if(!currentVaule){
        this.resetFormAddress()
      }
    },
    // 付款按钮
    paid(){
      if(JSON.stringify(this.currentAddress)==="{}"){
        this.$message.warning('您必须先选择地址才能付款')
      }else{
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/changeOrderToWaitForDeliver ',
          data: {
            id:this.orderId
          }
        }).then(res=>{
          if(res.status==200){
            this.$message.success('付款成功！')
            this.$router.replace('/profile')
          }else{
            this.$message.error('付款失败...')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    // 点击重置地址表单
    resetFormAddress(){
      for(let i in this.newFormAddress){
        this.newFormAddress[i]=''
      }
    },
    // 保存当前订单的地址信息
    async saveFormAddress(){
      const phone_reg=/^[1][3,5,7,8,9][0-9]{9}$/
      if(!phone_reg.test(this.newFormAddress.consigneeNumber)){
        this.$message.warning('手机号格式出错')
        return false
      }
      for(let i in this.newFormAddress){
        if(this.newFormAddress[i]===''){
          this.$message.warning('请完善地址信息')
          return 
        }
      }
      this.currentAddress.consigneeName=this.newFormAddress.consigneeName
      this.currentAddress.consigneeNumber=this.newFormAddress.consigneeNumber
      this.currentAddress.selfAddress=[this.newFormAddress.province,this.newFormAddress.city,this.newFormAddress.county_area]
      this.currentAddress.selfLocation=this.newFormAddress.selfLocation
      await this.keepOrderAddress()
      this.$confirm('您想要将该地址保存吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
      }).then(()=>{
        let address=this.currentAddress
        address.userAccount=this.$store.state.account
        if(address['_id']){
          delete address['_id']
        }
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: "/keepAddress",
          data: address
        }).then(res=>{
          if(res.status==200){
            this.$message.success("保存成功！")
          }else{
            this.$message.error('保存失败。。。')
          }
        })
      }).catch(()=>{
        this.$message.info('已取消保存')
      })
      this.showFormAddress=false
    }
  },
  computed:{
    // 计算当前总价格
    totalPrice(){
      let count=0
      this.goodsList.forEach(value=>{
        count+=value.price*value.numbers
      })
      return count
    },
    // 判断用户是否选择了当前订单的地址,如果没选 则返回true
    isCurrentAddress(){
      return JSON.stringify(this.currentAddress)==='{}'
    },
    // 显示当前使用的地址的格式
    orderSlefAddress(){
      if(this.currentAddress.selfAddress){
        return this.currentAddress.selfAddress.join('-')
      }else{
        return 
      }
    }
  },
  watch:{
    // 监听用户填写地址表单是否关闭 若关闭则将其内部的数据都清零
    showFormAddress:'clearFormAddressData'
  },
  components:{
    ShoppingCartCard,
    OrderDetailsAddressCard
  }
};
</script>

<style>
.order-details{
  position: absolute;
  left: 50%;
  width: 1000px;
  height: 880px;
  transform: translateX(-50%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
/* 订单商品区域 */
.order-details-goodslist{
  width: 100%;
  height: 75%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
/* 商品区域头部 */
.order-goodslist-title{
  height: 8%;
  width: 100%;
  background-color: rgb(245, 245, 245);
  font-size: 25px;
  padding-top: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  justify-content: space-between;
}
/* 商品区域主体 */
.order-goodslist-main{
  height: 92%;
  width: 100%;
  overflow-y: scroll;
}

/* 填写收货地址区域 */
.order-details-address{
  width: 100%;
  height: 25%;
  display: flex;
}
.order-details-address-main{
  width: 60%;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
}
.order-details-address-button{
  width: 20%;
  height: 100%;
  background-color: rgb(245, 245, 245);
}
/* 新增收货地址 */
.order-details-address-form{
  width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 20px;
}
</style>