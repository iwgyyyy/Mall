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
    <div class="shopping-cart-goods" v-show="!isEmpty" v-loading="GoodsIdList.length===0">
      <!-- 数字相当于商品id -->
      <Shopping-cart-card 
      v-for="item in GoodsIdList" 
      :key="item['_id']" 
      :ref="item['_id']"
      :goods="item"
      @getPrice="calculatePrice"
      @getSelf="deleteCartCard"
      :order_flag="true"
      ></Shopping-cart-card>
    </div>
    <el-empty description="购物车空空如也" v-show="isEmpty"></el-empty>
    <!-- 结算 显示价格等按钮 -->
    <div class="shopping-cart-settlement">
      <el-button style="margin:0 8% 0 10%;" type="primary" @click="collectionAll">全选</el-button>
      <el-button style="margin:0 43% 0 0" type="warning" @click="deleteFilter">删除选中项</el-button>
      <span>总价:<b style="color:rgb(231,35,26);font-size:20px">{{allprice}}￥</b></span>
      <el-button style="margin:0 2% 0 auto" type="danger" @click="settlement">结算</el-button>
    </div>
  </div>
</template>
 
<script>
import axios from 'axios'
import ShoppingCartCard from './Shopping_cart_card'
import { ElMessage } from 'element-plus';
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
      GoodsIdList:[],
      // 缓存组件
      // 删除购物车中的组件需要将缓存中的数据一并删除
      cache_list:[],
      isEmpty:false,
    };
  },
  props: {},

  methods: {
    // 得到所有购物车中的商品
    getShoppingCartGoods(){
      return axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/getShoppingCartGoods',
        data: {
          account:this.$store.state.account
        }
      }).then(res=>{
        this.GoodsIdList=res.data
        if(this.GoodsIdList.length===0) this.isEmpty=true
      }).catch(err=>{
        console.log(err);
      })
    },
    // 缓存组件
    async getCacheRefs(){
      await this.getShoppingCartGoods()
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
      let checkedCard=this.cache_list.filter(item=>item.flag==true).map(item=>item.goods['_id'])
      if(checkedCard.length==0){
        ElMessage.warning('未选择任意商品')
        return 
      }
      // 删除v-for循环的数组的项
      let i=0
      while(i<this.GoodsIdList.length){
        if(checkedCard.indexOf(this.GoodsIdList[i]['_id'])>-1){
          this.GoodsIdList.splice(i,1)
          continue
        }else{
          i++
        }
      }
      // 更新缓存的组件,将原数组赋值成未被选中形成的数组
      this.cache_list=this.cache_list.filter(item=>{
        if(checkedCard.indexOf(item.goods['_id'])==-1){
          return item
        }
      })
      // 删除数据库中的购物车商品
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/deleteManyShoppingCart',
        data: {
          id_list:checkedCard
        }
      }).then(res=>{
        if(res.status==200){
          ElMessage.success('删除成功！')
        }else{
          ElMessage.error('删除失败...')
        }
      }).catch(err=>{
        console.log(err);
      })
      if(this.GoodsIdList.length===0) this.isEmpty=true
    },
    // 结算商品
    async settlement(){
      const checkedCard=[],checkedCardId={}
      // 表示要传入到订单详情页的数据
      this.cache_list.filter(item=>item.flag==true).map((value,index)=>{
        checkedCard.push(value.goods)
        checkedCardId[index]={
          id:value.goods.goodsId,
          numbers:value.goods.numbers
        }
      })
      // 如果没有选择商品就返回
      if(checkedCard.length==0){
        ElMessage.warning('未选择任何商品')
        return 
      }
      // 判断结算的商品库存数量够不够
      await axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: '/checkStock',
        data:checkedCardId
      }).then(res=>{
        if(res.data==='库存足够'){
          // 库存足够就生成订单
          axios({
            method:'post',
            baseURL:'http://localhost:3000',
            url: '/generateOrder',
            data: {
              goodsMessage:checkedCard
            }
          }).then(res=>{
            // 生成订单成功
            this.deleteFilter() //将选中的商品删除
            const goodsList=checkedCard.map(value=>JSON.stringify(value))
            this.$router.push({path:'/order_details',query:{goodsList,orderId:res.data}})
          }).catch(err=>{
            console.log(err);
          })
        }else{
          ElMessage.error(res.data)
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    // 得到购物车是否被选中的总价
    calculatePrice(price,flag){
      if(flag) this.allprice+=price
      else this.allprice-=price
    },
    // 卡片中的删除按钮
    deleteCartCard(id){
      // 删除v-for循环的数组中的项
      for(let i in this.GoodsIdList){
        if(this.GoodsIdList[i]['_id']==id){
          this.GoodsIdList.splice(i,1)
          break
        }
      }
      // 删除缓存的列表的项
      for(let i in this.cache_list){
        if(this.cache_list[i].goods['_id']===id){
          this.cache_list.splice(i,1)
          break
        }
      }
      if(this.GoodsIdList.length===0) this.isEmpty=true
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
/* 空购物车 */
.shopping-cart-goods-empty{
  height: 80%;
  background-image: url('../../../assets/svg/mall/empty.svg');
  background-repeat: no-repeat;
  background-size: 90% 90%;
  background-position: center;
}
/* 购物车页尾结算按钮等 */
.shopping-cart-settlement{
  height: 10%;
  display: flex;
  align-items: center;
  background-color: rgb(243,243,243);
}
</style>