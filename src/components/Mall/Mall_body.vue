<template>
  <div class="fill mall-body">
    <Mall-card></Mall-card>
    <Mall-card></Mall-card>
    <Mall-card></Mall-card>
    <Mall-card></Mall-card>
    <Mall-card></Mall-card>
    <Mall-card></Mall-card>
    <Mall-card></Mall-card>
  </div>
</template>

<script>
import MallCard from './Mall_card'
export default {
  name: "MallBody",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
  components:{
    MallCard
  }
};
</script>

<style>
.mall-body{
  border-left: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
</style>