<template>
  <div class="shopping-cart">
    <!-- 显示页头等信息 -->
    <div class="shopping-cart-head">
      <span style="margin:0 20% 0 10%">商品</span>
      <span style="margin:0 10% 0 25%">单价</span>
      <span style="margin:0 10% 0 0">数量</span>
      <span style="margin:0 8% 0 0">小计</span>
      <span>操作</span>
    </div>
    <!-- 购物车中的商品 -->
    <div class="shopping-cart-goods">
      <!-- 数字相当于商品id -->
      <Shopping-cart-card 
      v-for="item in testGoodsIdList" 
      :key='item.goodsId.toString()' 
      :ref="item.goodsId.toString()"
      :goods="item"
      @getPrice="calculatePrice"
      @getSelf="deleteCartCard"
      :order_flag="true"
      ></Shopping-cart-card>
    </div>
    <!-- 结算 显示价格等按钮 -->
    <div class="shopping-cart-settlement">
      <el-button style="margin:0 8% 0 10%;" type="primary" @click="collectionAll">全选</el-button>
      <el-button style="margin:0 43% 0 0" type="warning" @click="deleteFilter">删除选中项</el-button>
      <span>总价:<b style="color:rgb(231,35,26);font-size:20px">{{allprice}}</b></span>
      <el-button style="margin:0 2% 0 auto" type="danger" @click="settlement">结算</el-button>
    </div>
  </div>
</template>
 
<script>
import ShoppingCartCard from './Shopping_cart_card'
export default {
  name: "Shopping_cart",
  created() {},
  mounted(){
    this.getCacheRefs()
  },
  data() {
    return {
      allprice:0,
      // 必须要用字符串当ref属性的值
      testGoodsIdList:[
        {
          goodsId:1,
          name:'哈士奇',
          img_route:require("../../../assets/svg/pets-cat1.svg"),
          number:2,
          price:18,
        },
        {
          goodsId:2,
          name:'折耳',
          img_route:require("../../../assets/svg/pets-cat1.svg"),
          number:1,
          price:14,
        },
        {
          goodsId:3,
          name:'金毛',
          img_route:require("../../../assets/svg/pets-cat1.svg"),
          number:1,
          price:20,
        },
        {
          goodsId:4,
          name:'边牧',
          img_route:require("../../../assets/svg/pets-cat1.svg"),
          number:3,
          price:30,
        },
        {
          goodsId:5,
          name:'布偶',
          img_route:require("../../../assets/svg/pets-cat1.svg"),
          number:4,
          price:50,
        }
      ],
      // 缓存组件
      // 删除购物车中的组件需要将缓存中的数据一并删除
      // 加入购物车中的组件也需要更新缓存中的数据
      cache_list:[],
    };
  },
  props: {},

  methods: {
    // 缓存组件
    getCacheRefs(){
      for(let i in this.$refs){
        this.cache_list.push(this.$refs[i])
      }
    },
    // 全选
    collectionAll(){
      if(this.cache_list.some(item=>item.flag==false)){
        this.cache_list.forEach(item=>item.flag=true)
      }else{
        this.cache_list.forEach(item=>item.flag=false)
      }
    },
    // 删除选中项
    deleteFilter(){
      // 得到选中的项的商品id
      let checkedCard=this.cache_list.filter(item=>item.flag==true).map(item=>item.goods.goodsId)
      // 删除v-for循环的数组的项
      let i=0
      while(i<this.testGoodsIdList.length){
        if(checkedCard.indexOf(this.testGoodsIdList[i].goodsId)>-1){
          this.testGoodsIdList.splice(i,1)
          continue
        }else{
          i++
        }
      }
      // 更新缓存的组件,将原数组赋值成未被选中形成的数组
      this.cache_list=this.cache_list.filter(item=>{
        if(checkedCard.indexOf(item.goods.goodsId)==-1){
          return item
        }
      })
    },
    // 结算商品
    settlement(){
      let goods1=JSON.stringify({name:'折耳猫',price:18})
      let goods2=JSON.stringify({name:'哈士奇',price:19})
      let goods3=JSON.stringify({name:'金毛',price:20})

      this.$router.push({path:'/order_details',query:{goods1,goods2,goods3}})
    },
    // 得到购物车是否被选中的总价
    calculatePrice(price,flag){
      if(flag) this.allprice+=price
      else this.allprice-=price
    },
    // 卡片中的删除按钮
    deleteCartCard(id){
      // 删除v-for循环的数组中的项
      for(let i in this.testGoodsIdList){
        if(this.testGoodsIdList[i].goodsId==id){
          this.testGoodsIdList.splice(i,1)
          break
        }
      }
      // 删除缓存的列表的项
      for(let i in this.cache_list){
        if(this.cache_list[i].goods.goodsId===id){
          this.cache_list.splice(i,1)
          break
        }
      }
    }
  },
  components:{
    ShoppingCartCard
  }
};
</script>

<style>
/* 总的div框架 */
.shopping-cart{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
/* 购物车页头*/
.shopping-cart-head{
  height: 10%;
  background-color: rgb(243,243,243);
  display: flex;
  align-items: center;
  font-size: 18px;
}
/* 购物车展示商品 */
.shopping-cart-goods{
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
}
/* 购物车页尾结算按钮等 */
.shopping-cart-settlement{
  height: 10%;
  display: flex;
  align-items: center;
  background-color: rgb(243,243,243);
}
</style>