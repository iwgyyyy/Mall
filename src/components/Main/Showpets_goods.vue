<template>
  <div>
    <el-tabs tab-position="left" @tab-click="handleTabClick">
    <el-tab-pane v-for="item in kind_of_goods" :label="item" :key='item'>
      <Show-goods-card
      v-for="(item,index) in petsGoods"
      :goods="item"
      :key="index"
      ></Show-goods-card>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import ShowGoodsCard from './Showgoods_card'
import axios from 'axios'
export default {
  name: "Showpets_goods",
  created() {
    axios({
      method:'post',
      baseURL:"http://localhost:3000",
      url: '/getPetsGoods',
    }).then(res=>{
      res.data.forEach(value=>{
        if(!this.kind_of_goods.includes(value['subject'])) 
          this.kind_of_goods.push(value['subject'])
      })
      this.petsGoods=res.data
    }).catch(err=>{
      console.log(err);
    })
  },
  data() {
    return {
      // 宠物用品类型
      kind_of_goods:['全部'],
      // 宠物用品数据
      petsGoods:[]
    };
  },
  props: {},
  methods: {
    // 点击标签获得数据
    handleTabClick(e){
      const subject=e.props.label
      axios({
        method:'post',
        baseURL:'http://localhost:3000',
        url: "/getPetsGoods",
        data: {
          subject
        }
      }).then(res=>{
        this.petsGoods=res.data
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  components:{
    ShowGoodsCard
  }
};
</script>

<style>

</style>