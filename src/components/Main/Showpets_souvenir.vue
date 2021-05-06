<template>
  <div>
    <el-tabs type="border-card" @tab-click="handleTabClick">
      <el-tab-pane v-for='item in souvenir_name' :label="item" :key='item'>
        <Show-souvenir-card
        v-for="(item,index) in souvenir_list"
        :souvenir="item"
        :key="index"
        ></Show-souvenir-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ShowSouvenirCard from './Showsouvenir_card'
import axios from 'axios'
export default {
  name: "Showpets_souvenir",
  created() {
    axios({
      method:'post',
      baseURL:"http://localhost:3000",
      url: "/getSouvenir",
    }).then(res=>{
      res.data.forEach(value=>{
      if(!this.souvenir_name.includes(value['subject'])) 
        this.souvenir_name.push(value['subject'])
      })
      this.souvenir_list=res.data
    }).catch(err=>{
      console.log(err);
    })
  },
  data() {
    return {
      souvenir_name:['全部'],
      souvenir_list:[]
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
        url: "/getSouvenir",
        data: {
          subject
        }
      }).then(res=>{
        this.souvenir_list=res.data
      }).catch(err=>{
        console.log(err);
      })
    },
  },
  components:{
    ShowSouvenirCard
  }

};
</script>

<style>
</style>