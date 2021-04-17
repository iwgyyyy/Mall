<template>
  <div class="mall">
    <!-- 商城头部 -->
    <div class="mall-batten">
      <Mall-head></Mall-head>
    </div>
    <!-- 展示商品 -->
    <div class="mall-main">
      <Mall-body></Mall-body>
    </div>
    <!-- 分页器 -->
    <div class="mall-page flex-center">
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage3"
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
  methods: {},
  components: {
    MallHead,
    MallBody
  },
};
</script>

<style>
.mall{
  height: 1500px;
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
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}
.mall-page{
  position: absolute;
  height: 4%;
  width: 80%;
  top: 96%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
}
</style>
