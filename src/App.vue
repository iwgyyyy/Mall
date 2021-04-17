<template>
  <header class="header">
  <Navigation></Navigation>
  </header>
  <main style="position:relative;">
    <router-view></router-view>
  </main>
  <footer>
    
  </footer>
</template>


<script>
import Navigation from './components/Bar/Navigation'
export default {
  components:{
    Navigation
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
.header{
  position: sticky;
  top: 0;
  z-index: 98;
}
/* 全局类 */
/* 居中 */
.flex-center{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
/* 垂直居中 */
.flex-y-center{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

/* 占父元素100% */
.fill{
  height: 100%;
  width: 100%;
}
</style>
