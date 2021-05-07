<template>
  <div class="Receiving-address-form">
    <div class="Receiving-address-form-title">
      <b>添加收货地址</b>
    </div>
    <!-- 控件 -->
    <div class="Receiving-address-form-control">
      <!-- 收货人姓名 -->
      <div>
        <img src="../../../assets/svg/personal_message/receiver.svg" alt="#">
        <input type="text" placeholder="请输入收货人姓名"  v-model="name">
      </div>
      <!-- 手机号 -->
      <div>
        <img src="../../../assets/svg/personal_message/phone.svg" alt="#">
        <input type="text" placeholder="请输入收货人手机号码" v-model="phonenumber">
      </div>
      <!-- 地区 -->
      <div>
        <img src="../../../assets/svg/personal_message/location.svg" alt="#">
        <input type="text" placeholder="请输入省份" style="width:120px;" v-model="province"> -
        <input type="text" placeholder="请输入市名" style="width:120px;" v-model="city"> -
        <input type="text" placeholder="请输入县名或区名" style="width:120px;" v-model='county_area'>
      </div>
      <!-- 详细地址 -->
      <div>
        <img src="../../../assets/svg/personal_message/address.svg" alt="#">
        <input type="text" placeholder="请输入详细地址" style="width:450px" v-model="selfLocation">
      </div>
    </div>

    <!-- 按钮 -->
    <div class="Receiving-address-form-button">
      <el-button type="primary" @click="keepAddress">保存</el-button>
      <el-button type="info" @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {ElMessage} from 'element-plus'
export default {
  name: "ReceivingAddressForm",
  created() {},
  data() {
    return {
      name:'',
      phonenumber:'',
      province:'',
      city:'',
      county_area:'',
      selfLocation:'',
      addressId:''
    };
  },
  props: {},
  methods: {
    clearAllMessage(){
      this.name='',
      this.phonenumber='',
      this.province='',
      this.city='',
      this.county_area='',
      this.selfLocation=''
      this.addressId=''
    },
    cancel(){
      this.clearAllMessage()
      this.$emit('cancelAddressForm')
    },
    // 检查输入的地址
    checkAddressMessage(){
      if(this.name==''){
        ElMessage.warning('请输入收货人姓名')
        return false
      }
      const phone_reg=/^[1][3,5,7,8,9][0-9]{9}$/
      if(!phone_reg.test(this.phonenumber)){
        ElMessage.warning('手机号格式出错')
        return false
      }
      if(this.province==''||this.city==''||this.county_area==''){
        ElMessage.warning('请输入省份、市名和区(县)名')
        return false
      }
      if(this.selfLocation==''){
        ElMessage.warning('请输入详细地址')
        return false
      }
      return true
    },
    // 保存信息
    keepAddress(){
      if(this.checkAddressMessage()&&!this.addressId){
        const selfAddress=[this.province,this.city,this.county_area]
        axios({
          method:'post',
          baseURL:"http://localhost:3000",
          url: '/keepAddress',
          data: {
            userAccount:this.$store.state.account,
            selfAddress,
            selfLocation:this.selfLocation,
            consigneeName:this.name,
            consigneeNumber:this.phonenumber
          }
          }).then(res=>{
            if(res.status==200){
              ElMessage.success('保存成功！')
              this.$emit('flushAddress')
              this.cancel()
            }
          }).catch(err=>{
            this.clearAllMessage()
            console.log(err);
        })
      }else if(this.checkAddressMessage()&&this.addressId){
        const selfAddress=[this.province,this.city,this.county_area]
        axios({
          method:'post',
          baseURL:"http://localhost:3000",
          url: '/changeAddress',
          data: {
            id:this.addressId,
            userAccount:this.$store.state.account,
            selfAddress,
            selfLocation:this.selfLocation,
            consigneeName:this.name,
            consigneeNumber:this.phonenumber
          }
        }).then(res=>{
          if(res.status==200){
            ElMessage.success('修改成功')
            this.$emit('flushAddress')
            this.cancel()
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
.Receiving-address-form{
  width: 50%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: whitesmoke;
  transform: translate(-50%,-50%);
}
/* 表单头 */
.Receiving-address-form-title{
  height: 5%;
  background-color: rgb(220,220,220);
  border-bottom: 1px solid black;
  padding-left: 30px;
  line-height: 2;
}
/* 表单按钮div */
.Receiving-address-form-button{
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
}
/* 表单控件div */
.Receiving-address-form-control{
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 20px;
}
.Receiving-address-form-control img{
  height: 40px;
  vertical-align: middle;
}
.Receiving-address-form-control input{
  outline: none;
  border: 1px solid black;
  width: 250px;
  height: 40px;
  border-radius: 4px;
}
.Receiving-address-form-control input:focus{
  border:1px solid cornflowerblue;
}
</style>