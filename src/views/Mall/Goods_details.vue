<template>
  <div class="goods-details flex-center">
    <!-- 左边图片 -->
    <div class="goods-details-imagearea">
      <div class="goods-details-imagearea-bigimg">
        <img :src="require('D:/Project/thpetsmall/public/goodsImages/'+goods.showPictureAddress)" alt="#" id='bigimage'>
      </div>
      <div class="goods-details-imagearea-smallimg flex-center">
          <img 
          v-for="(item,index) in goods.detailPictureAddress"
          :src="require('D:/Project/thpetsmall/public/goodsImages/'+item)" 
          alt="#" 
          :key="index"
          @mouseenter="changeImg">
      </div>
    </div>

    <!-- 右边介绍区域和购买等 -->
    <div class="goods-details-textarea">
      <!-- 商品名称 -->
      <div class="goods-details-textarea-name">
        <p>{{goods.name}}</p>
      </div>
      <!-- 商品介绍 -->
      <div class="goods-details-textarea-intro">
        <p v-if="goods.selfType=='宠物'">{{goods.sex+'    '}}{{goods.age}}</p>
        <p v-else-if="goods.selfType=='宠物用品'">{{goods.notice}}</p>
        <p v-else>{{goods.material}}</p>
        <article>
          {{goods.decscription}}
        </article>
      </div>
      <!-- 数量以及小计价格 -->
      <div class="goods-details-textarea-price">
        <span style="margin:6% 2% auto 5%">数量:</span>
        <!-- 最小值是测试的url中的地址栏传过来的参数 后续需要修改 -->
        <el-input-number 
        :min="1"  
        label="购买数量" 
        v-model="count" 
        style="margin:6% 10% auto 1%">
        </el-input-number>
        <span>小计:<b>{{totalPrice}}</b></span>
      </div>
      <!-- 加入购物车或购买按钮 -->
      <div class="goods-details-textarea-button">
        <el-button type="primary" style="margin-right:10%" @click="addToShoppingCart">加入购物车</el-button>
        <el-button type="warning" style="margin-right:10%" @click="buy">购买</el-button>
        <el-button type="info" @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {ElMessage} from 'element-plus'
export default {
  name: "GoodsDetails",
  created() {
    this.goods=this.$route.query
  },
  data() {
    return {
      count:1,
      goods:null
    };
  },
  computed:{
    totalPrice(){
      return this.goods.price*this.count
    }
  },
  props: {},
  methods: {
    changeImg(e){
      document.getElementById('bigimage').src=e.target.src
    },
    // 返回
    back(){
      history.back(-1)
    },
    // 添加至购物车
    addToShoppingCart(){
      if(!this.$store.state.account){
        ElMessage.warning('请先登录')
      }else{
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/addToShoppingCart',
          data: {
            account:this.$store.state.account,
            goodsId:this.goods['_id'],
            price:this.goods.price,
            name:this.goods.selfClass,
            showPictureAddress:this.goods.showPictureAddress,
            numbers:this.count
          }
        }).then(res=>{
          if(res.status==200){
            ElMessage.success('添加成功！')
          }else{
            ElMessage.error('添加失败..')
          }
        }).catch(err=>{
          console.log(err);
        })
      }
    },
    // 购买
    buy(){
      if(!this.$store.state.account){
        ElMessage.warning('请先登录')
      }else{
        let goods={}
        goods.numbers=this.count
        goods.name=this.goods.selfClass
        goods.goodsId=this.goods['_id']
        goods.showPictureAddress=this.goods.showPictureAddress
        goods.price=this.goods.price
        axios({
          method:'post',
          baseURL:'http://localhost:3000',
          url: '/generateOneGoodsOrder',
          data: {
            numbers:this.count,
            account:this.$store.state.account,
            goods
          }
        }).then(res=>{
          if(res.data=='库存数量不足'){
            this.$message.error('库存数量不足。。。')
          }else{
            const goodsList=[JSON.stringify(goods)]
            this.$router.push({path:'/order_details',query:{goodsList,orderId:res.data}})
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
.goods-details{
  height: 650px;
  width: 1300px;
  position: absolute;
  left: 50%;
  top: 90px;
  transform: translateX(-50%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border: 1px solid rgba(0,0,0,0.1);
}
/* 左边图片区域 */
.goods-details-imagearea{
  width: 50%;
  height: 100%;
}
/* 大图区域 */
.goods-details-imagearea-bigimg{
  width: 100%;
  height: 80%;
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.goods-details-imagearea-bigimg img{
  width: 100%;
  height: 100%;
}
/* 小图区域 */
.goods-details-imagearea-smallimg{
  width: 100%;
  height: 20%;
  overflow: hidden;
}
.goods-details-imagearea-smallimg img{
  width: 128px;
  height: 128px;
}
/* 右边介绍区域 */
.goods-details-textarea{
  width: 50%;
  height: 100%;
}
/* 商品名称div区域 */
.goods-details-textarea-name{
  width: 100%;
  height: 15%;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  font-size: 36px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.goods-details-textarea-name p{
  padding: 0;
  margin: 0;
}
/* 商品介绍区域 */
.goods-details-textarea-intro{
  width: 90%;
  height: 40%;
  padding-left: 40px;
  text-align:justify;
  letter-spacing: 3px;
  box-sizing: border-box;
}
/* 商品数量以及小计区域 */
.goods-details-textarea-price{
  width: 100%;
  height: 20%;
  font-size: 23px;
  box-sizing: border-box;
}
/* 两个按钮区域 */
.goods-details-textarea-button{
  width: 100%;
  height: 25%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 10%;
}
</style>