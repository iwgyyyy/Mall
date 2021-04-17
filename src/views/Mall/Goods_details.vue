<template>
  <div class="goods-details flex-center">
    <!-- 左边图片 -->
    <div class="goods-details-imagearea">
      <div class="goods-details-imagearea-bigimg">
        <img src="../../assets/images/pets/dragon.png" alt="#" id='bigimage'>
      </div>
      <div class="goods-details-imagearea-smallimg flex-center">
          <img :src="test_1" alt="#" @mouseenter="changeImg">
          <img :src="test_2" alt="#" @mouseenter="changeImg">
          <img :src="test_3" alt="#" @mouseenter="changeImg">
          <img :src="test_4" alt="#" @mouseenter="changeImg">
          <img :src="test_5" alt="#" @mouseenter="changeImg">
      </div>
    </div>

    <!-- 右边介绍区域和购买等 -->
    <div class="goods-details-textarea">
      <!-- 商品名称 -->
      <div class="goods-details-textarea-name">
        <p>九阳破壁豆浆机</p>
      </div>
      <!-- 商品介绍 -->
      <div class="goods-details-textarea-intro">
        <article>
          京东平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！
          注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，
          本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。
          只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
        </article>
      </div>
      <!-- 数量以及小计价格 -->
      <div class="goods-details-textarea-price">
        <span style="margin:6% 2% auto 5%">数量:</span>
        <!-- 最小值是测试的url中的地址栏传过来的参数 后续需要修改 -->
        <el-input-number 
        :min="parseInt(this.$route.params.goodsId)"  
        label="购买数量" 
        v-model="count" 
        style="margin:6% 10% auto 1%">
        </el-input-number>
        <span>小计:<b>1000</b></span>
      </div>
      <!-- 加入购物车或购买按钮 -->
      <div class="goods-details-textarea-button">
        <el-button type="primary" style="margin-right:10%">加入购物车</el-button>
        <el-button type="warning" style="margin-right:10%">购买</el-button>
        <el-button type="info" @click="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsDetails",
  created() {},
  data() {
    return {
      count:0,
      test_1:require("../../assets/images/pets/dragon.png"),
      test_2:require("../../assets/images/pets/cattle.png"),
      test_3:require("../../assets/images/pets/sheep.png"),
      test_4:require("../../assets/images/pets/tiger.png"),
      test_5:require("../../assets/images/pets/horse.png"),
    };
  },
  computed:{},
  props: {},
  methods: {
    changeImg(e){
      document.getElementById('bigimage').src=e.target.src
    },
    // 返回
    back(){
      history.back(-1)
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
  width: 520px;
  height: 520px;
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