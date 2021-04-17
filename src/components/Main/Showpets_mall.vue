<template>
  <div>
    <el-tabs>
      <!-- 搜索数据库中的每一个种类的前几条数据存入一个数组内部 再用v-for遍历显示 -->
      <el-tab-pane v-for="item in pets_name" :label="item" :key='item'>
          <Show-pets-card 
          v-for="(item,index) in test_pet_list" 
          :key='index' 
          :pet='item' 
          :testId='index'>
          </Show-pets-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ShowPetsCard from './Showpets_card'
export default {
  name: "Showpets_mall",
  created() {},
  data() {
    return {
      // 宠物种类，后续需从数据库读取
      pets_name:['全部种类','狗狗','猫','仓鼠','兔子'],
      // 测试宠物数据
      test_pet_list:[
        {
        type:'狗狗',
        family:'哈士奇',
        sexy:'公',
        age:'1岁',
        img_route:require('../../assets/images/dog-hashiqi1.png'),
        svg_route:require('../../assets/svg/pets-dog1.svg')
        },
        {
        type:'猫',
        family:'折耳',
        sexy:'母',
        age:'6个月',
        img_route:require('../../assets/images/dog-hashiqi1.png'),
        svg_route:require('../../assets/svg/pets-dog1.svg')
        },
        {
        type:'仓鼠',
        family:'坎贝尔',
        sexy:'公',
        age:'1岁',
        img_route:require('../../assets/images/dog-hashiqi1.png'),
        svg_route:require('../../assets/svg/pets-dog1.svg')
        },
        {
        type:'兔子',
        family:'垂耳',
        sexy:'公',
        age:'2岁',
        img_route:require('../../assets/images/dog-hashiqi1.png'),
        svg_route:require('../../assets/svg/pets-dog1.svg')
        }]
      
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