<template>
  <div>
    <app-header></app-header>
    <appSideHeader></appSideHeader>
    <router-view></router-view>
  </div>
</template>


<script>
import Header from './components/header/Header';
import SideHeader from './components/header/SideHeader'
export default {
  components:{
    appHeader: Header,
    appSideHeader: SideHeader
  }
  
}
</script>

<style scoped>

</style>