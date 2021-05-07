<template>
  <div class="mall">
    <!-- 商城头部 -->
    <div class="mall-batten">
      <Mall-head
      @showAllGoods='showAllGoodsList'
      @showPets='showPetsList'
      @showPetsGoods='showPetsGoodsList'
      @showSouvenir='showSouvenirList'
      @ascending='ascendingOrder'
      @descending='descendingOrder'
      @conditionPrice='showConditionPrice'
      ></Mall-head>
    </div>
    <!-- 展示商品 -->
    <div class="mall-main">
      <Mall-body ref='body'></Mall-body>
    </div>
    <!-- 分页器 -->
    <div class="mall-page flex-center">
       <el-pagination
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import MallHead from "../../components/Mall/Mall_head"
import MallBody from "../../components/Mall/Mall_body"
export default {
  name: "Mall",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {
    // 按商品类型分类
    showAllGoodsList(){
      this.$refs.body.goods=this.$refs.body.goods_list
    },
    showPetsList(){
      this.$refs.body.goods=this.$refs.body.goods_list.filter(value=>value.selfType=="宠物")
    },
    showPetsGoodsList(){
      this.$refs.body.goods=this.$refs.body.goods_list.filter(value=>value.selfType=="宠物用品")
    },
    showSouvenirList(){
      this.$refs.body.goods=this.$refs.body.goods_list.filter(value=>value.selfType=="周边")
    },
    // 按价格升序降序
    ascendingOrder(){
      this.$refs.body.goods.sort((a,b)=>a.price-b.price)
    },
    descendingOrder(){
      this.$refs.body.goods.sort((a,b)=>b.price-a.price)
    },
    // 按价格区间查找
    showConditionPrice(min,max){
      // 尽量不要写成一行 否则影响后续查看
      this.$refs.body.goods=this.$refs.body.goods_list.filter(value=>{
        return value.price>=min&&value.price<=max
      })
    },
  },
  components: {
    MallHead,
    MallBody
  },
};
</script>

<style>
.mall{
  height: 1200px;
  width: 100%;
  position: relative;
}
.mall-batten{
  position: absolute;
  left: 50%;
  height: 30%;
  width: 80%;
  transform: translateX(-50%);
}
.mall-main{
  position: absolute;
  height: 66%;
  width: 80%;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
}
.mall-page{
  position: absolute;
  height: 4%;
  width: 80%;
  top: 90%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
}
</style>
