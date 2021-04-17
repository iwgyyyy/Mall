<template>
  <div>
    <el-tabs tab-position="left">
    <el-tab-pane v-for="item in kind_of_goods" :label="item" :key='item'>
      <Show-goods-card></Show-goods-card>
      <Show-goods-card></Show-goods-card>
      <Show-goods-card></Show-goods-card>
      <Show-goods-card></Show-goods-card>
      <Show-goods-card></Show-goods-card>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import ShowGoodsCard from './Showgoods_card'
export default {
  name: "Showpets_goods",
  created() {},
  data() {
    return {
      kind_of_goods:['医用品','穿搭','食物','玩具','其他']
    };
  },
  props: {},
  methods: {},
  components:{
    ShowGoodsCard
  }
};
</script>

<style>

</style>