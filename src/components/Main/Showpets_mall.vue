<template>
  <div>
    <el-tabs>
      <!-- 搜索数据库中的每一个种类的前几条数据存入一个数组内部 再用v-for遍历显示 -->
      <el-tab-pane v-for="i in pets_name" :label="i" :key='i'>
          <Show-pets-card 
          v-for="(item,index) in pet_list" 
          :key='index' 
          :pet='item'>
          </Show-pets-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ShowPetsCard from './Showpets_card'
import axios from 'axios'
export default {
  name: "Showpets_mall",
  created() {
    // 获得所有宠物类型
    axios({
      method:'post',
      baseURL:"http://localhost:3000",
      url: "/getPets",
    }).then(res=>{
      res.data.forEach(value=>{
        if(!this.pets_name.includes(value['subject'])) 
          this.pets_name.push(value['subject'])
        value['showPictureAddress']='../..'+value['showPictureAddress']
        this.pet_list.push(value)
      })
    }).catch(err=>{
      console.log(err);
    })

  },
  data() {
    return {
      // 宠物种类，后续需从数据库读取
      pets_name:['全部种类'],
      // 测试宠物数据
      pet_list:[]
    };
  },
  props: {},
  methods: {},
  components:{
    ShowPetsCard
  }
};
</script>

<style>
.el-tab-pane{
  height: 600px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
}
</style>