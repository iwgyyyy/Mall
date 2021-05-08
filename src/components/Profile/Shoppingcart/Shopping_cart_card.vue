<template>
  <div class="shopping-cart-card">
    <!-- 相当于每个商品的选中按钮 -->
    <div v-show='order_flag' style="margin:0 2.5% 0 2.5%">
      <input type="checkbox" :checked='flag' @click="isChecked" :key="goods.goodsId">
    </div>

    <!-- 商品 -->
    <div class="shopping-cart-card-goods" @click="goToGoodsDetails">
      <!-- 后续仍需修改 路由的跳转需要冒泡到div上 -->
      <img :src="require('D:/Project/thpetsmall/public/goodsImages/'+goods.showPictureAddress)" alt="#">
      <router-link to="">{{goods.name}}</router-link>
    </div>

    <!-- 单价 -->
    <div class="shopping-cart-card-price">
    <span>{{prices}}</span>
    </div>

    <!-- 数量 -->
    <div v-show='order_flag' style="margin-right: 2.8%;">
       <el-input-number v-model="goods.numbers" :min="1" size="small" @change="changeNumber"></el-input-number>
    </div>
    <div v-show="!order_flag" style="margin:0 5% 0 6%;">
      <span>数量*{{goods.numbers}}</span>
    </div>

    <!-- 小计 -->
    <div class="shopping-cart-card-totalprice">
      <b>￥{{totalprice}}</b>
    </div>

    <!-- 操作 -->
    <div v-show='order_flag'>
      <el-button type="danger" icon="el-icon-delete" circle @click="deleteself"></el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus';
export default {
  name: "Shopping_cart_card",
  created() {},
  beforeUnmount(){
    if(this.flag)
    this.$emit('getPrice',this.totalprice,false)
  },
  data() {
    return {
      flag:false,
      beforeTotalPrice:0,
    };
  },
  props: {
    goods:{
      type:Object,
    },
    order_flag:{
        type:Boolean,
        default:true
    }
  },
  computed:{
    prices(){
      return this.goods.price+"￥"
    },
    totalprice(){
      return this.goods.price*this.goods.numbers
    }
  },
  watch:{
    // 监听flag属性 如果flag改变 则应该触发当前事件
    flag:function(){
      this.$emit('getPrice',this.totalprice,this.flag)
    }
  },
  methods: {
    // 跳转至商品详情页
    goToGoodsDetails(){
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/getOneGoodsById',
        data: {
          id:this.goods.goodsId
        }
      }).then(res=>{
        if(res.status==500){
          ElMessage.error('没有找到该商品。。该商品可能已下架')
        }else{
          this.$router.push({
            path:'/goods_details',
            query:res.data
          })
        }
      }).catch(err=>{
        console.log(err);
      })
      
    },
    // 当前项是否被选中
    isChecked(){
      this.flag=!this.flag
    },
    // 删除按钮
    deleteself(){
      this.$emit('getSelf',this.goods['_id'])
      // 删除数据库中的该条数据
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/deleteOneShoppingCart',
        data: {
          id:this.goods['_id']
        }
      }).then(res=>{
        if(res.status==200){
          ElMessage.success('删除成功！')
        }else{
          ElMessage.error('删除失败..')
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 改变购物车商品数量
    changeNumber(currentValue,oldValue){
      if(this.flag){  
        this.$emit("getPrice",(currentValue-oldValue)*this.goods.price,this.flag)
      }
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/changeNumbers',
        data: {
          id:this.goods['_id'],
          currentValue
        }
      }).then(res=>{
        if(res.status==200){
          ElMessage.success('修改数量成功')
        }else{
          ElMessage.error('修改数量失败...')
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  },
};
</script>

<style>
.shopping-cart-card{
  height: 120px;
  border-bottom:inset;
  display: flex;
  align-items: center;
}
/* 商品详情页 */
.shopping-cart-card-goods{
  height: 100%;
  width: 30%;
  margin-right: 18.5%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.shopping-cart-card-goods img{
  height: 100%;
  width: 50%;
}
.shopping-cart-card-goods a{
  margin-left:10%;
  text-decoration: none;
  color: black;
}
/* 商品单价 */
.shopping-cart-card-price{
  width: 120px;
  text-align: center;
  margin-right: 3.5%;
}
/* 商品小计 */
.shopping-cart-card-totalprice{
  width: 120px;
  text-align: center;
  margin-right: 5%;
}
</style>  