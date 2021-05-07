<template>
  <!-- 头部展示 升序降序排列 价格区间 -->
  <div class="flex-center mall-head-title">
    <div>
      <el-button @click="ascending">升序排列</el-button>
      <el-button @click="descending">降序排列</el-button>
    </div>
    <div class="mall-head-price-space">
      <span>价格区间: </span>
      <input type="tel" v-model="minPrice"> -
      <input type="tel" v-model="maxPrice" style="margin-right:20px">
      <el-button type='primary' @click="conditionPrice">确定</el-button>
    </div>
    <div>
      <el-button @click="showAllGoods">全部商品</el-button>
      <el-button @click="showPets">宠物</el-button>
      <el-button @click="showPetsGoods">宠物用品</el-button>
      <el-button @click="showSouvenir">周边</el-button>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
  name: "MallHead",
  created() {},
  data() {
    return {
      minPrice:'',
      maxPrice:''
    };
  },
  props: {},
  methods: {
    ascending(){
      this.$emit('ascending')
    },
    descending(){
      this.$emit('descending')
    },
    showAllGoods(){
      this.$emit('showAllGoods')
    },
    showPets(){
      this.$emit('showPets')
    },
    showPetsGoods(){
      this.$emit('showPetsGoods')
    },
    showSouvenir(){
      this.$emit('showSouvenir')
    },
    conditionPrice(){
      const minPrice=parseFloat(this.minPrice)
      const maxPrice=parseFloat(this.maxPrice)
      if(!Number.isNaN(minPrice)&&!Number.isNaN(maxPrice)&&minPrice<=maxPrice&&minPrice>=0){
        this.$emit('conditionPrice',this.minPrice,this.maxPrice)
      }else{
        this.minPrice=''
        this.maxPrice=''
        ElMessage.warning('价格格式有误')
      }
    }
  },
};
</script>

<style scoped>
/* 头部升序降序那一行 */
.mall-head-title{
  width:100%;
  height:20%;
  justify-content:space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
/* 价格区间div */
.mall-head-price-space{
  font-size: 20px;
}

.mall-head-price-space input{
  width: 100px;
  height: 35px;
  border-radius: 4px;
  outline: none;
  border:1px solid black;
}
.mall-head-price-space input:focus{
  border: 1px solid cornflowerblue;
}
</style>