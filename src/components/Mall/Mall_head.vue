<template>
  <div class="mall-head fill">
    <!-- 头部展示 升序降序排列 价格区间 -->
    <div class="flex-center mall-head-title">
      <div style="margin:0 5% 0 1%">
        <el-button>升序排列</el-button>
        <el-button>降序排列</el-button>
      </div>
      <div class="mall-head-price-space">
        <span>价格区间: </span>
        <input type="tel"> -
        <input type="tel" style="margin-right:20px">
        <el-button type='primary'>确定</el-button>
      </div>
    </div>
    <!-- 分类区域 -->
    <div style="width:100%;height:80%;display:flex">
      <!-- 显示分类名称 -->
      <aside class="mall-head-aside flex-y-center">
        <div class="flex-center mall-head-aside-content">
          <span>标签:</span>
        </div>
        <div class="flex-center mall-head-aside-content">
          <span>商品:</span>
        </div>
        <div class="flex-center mall-head-aside-content">
          <span>分类:</span>
        </div>
        <div class="flex-center mall-head-aside-content">
          <span>种类:</span>
        </div>
      </aside>
      <!-- 展示分类按钮 -->
      <div style="width:90%;height:100%;background:white;">
        <!-- 标签 -->
        <div class="mall-head-aside-button flex-center">
          <el-tag v-for="i in [1,2,3]" :key='i' type="success" closable style="margin-right: 1%">{{i}}</el-tag>
        </div>
        <!-- 商品分类 宠物 宠物用品和周边等 -->
        <div class="mall-head-aside-button flex-center">
          <el-button>宠物</el-button>
          <el-button>宠物用品</el-button>
          <el-button>周边</el-button>
        </div>
        <!-- 二级分类 -->
        <div class="mall-head-aside-button">

        </div>
        <!-- 三级分类 -->
        <div class="mall-head-aside-button">

        </div>
      </div>
    </div>  
    
  </div>
</template>

<script>
export default {
  name: "MallHead",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style scoped>
.mall-head{
  background-color: rgb(245,245,245);
  border-left:1px solid rgba(0, 0, 0, 0.1);
  border-right:1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
/* 头部升序降序那一行 */
.mall-head-title{
  width:100%;
  height:20%;
  justify-content:flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
/* 价格区间div */
.mall-head-price-space{
  font-size: 20px;
}
/* aside样式 */
.mall-head-aside{
  width:10%;
  height:100%;
  background-color: rgb(250, 250, 250);
}
/* aside内部div样式 */
.mall-head-aside-content{
  border-bottom:1px solid rgba(0, 0, 0, 0.1);
  width:100%;
  height:25%;
}
/* 按钮区域div内部的div样式 */
.mall-head-aside-button{
  height:25%;
  border-bottom:1px solid rgba(0, 0, 0, 0.1);
  box-sizing:border-box;
  justify-content: flex-start;
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