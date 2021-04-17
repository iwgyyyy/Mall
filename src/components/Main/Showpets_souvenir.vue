<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane v-for='item in souvenir_name' :label="item" :key='item'>
        <Show-souvenir-card></Show-souvenir-card>
        <Show-souvenir-card></Show-souvenir-card>
        <Show-souvenir-card></Show-souvenir-card>
        <Show-souvenir-card></Show-souvenir-card>
        <Show-souvenir-card></Show-souvenir-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ShowSouvenirCard from './Showsouvenir_card'
export default {
  name: "Showpets_souvenir",
  created() {},
  data() {
    return {
      souvenir_name:['模型','衣服','玩偶']
    };
  },
  props: {},
  methods: {},
  components:{
    ShowSouvenirCard
  }

};
</script>

<style>
</style>