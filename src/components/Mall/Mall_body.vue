<template>
  <div class="fill mall-body" v-show="!isGoodsEmpty">
    <Mall-card
    v-for="(item,index) in goods"
    :goods="item"
    :key="index"
    ></Mall-card>
  </div>
  <div class="fill mall-body mall-body-empty" v-show="isGoodsEmpty">

  </div>
</template>

<script>
import MallCard from './Mall_card'
import axios from 'axios'
export default {
  name: "MallBody",
  created() {
    axios({
      method:'post',
      baseURL:"http://localhost:3000",
      url: "/getAllGoods",
    }).then(res=>{
      this.goods_list=res.data
      this.goods=res.data
    }).catch(err=>{
      console.log(err);
    })
  },
  data() {
    return {
      // 商品列表
      goods_list:[],
      // 循环展示的商品
      goods:[],
      // 商品分类（狗 猫等）
      subject:[],
      // 商品二级分类 （哈士奇 金毛等）
      selfClass:[]
    };
  },
  props: {},
  methods: {},
  computed:{
    isGoodsEmpty(){
      return this.goods.length==0
    }
  },
  components:{
    MallCard
  }
};
</script>

<style>
.mall-body{
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.mall-body-empty{
  background-image: url('../../assets/svg/mall/empty.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 90% 90%;
}
</style>