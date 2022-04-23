<template>
  <div class="m_profileContainer container">
    
    <div class="m_profilePageHeader">
      My Projects Board
    </div>

    <!-- calling children routes -->
    <router-view></router-view>

  <!-- Show all project for the user that was created by him or assigned to him -->
    <appBoardsList/>


  </div>
</template>

<script>
import BoardsList from '../components/profilePageComponents/BoardsList';
export default {
  components:{
    appBoardsList:BoardsList
  },
  created(){
    this.$store.dispatch('check_loged_user')
  },
  
}
</script>

<style scoped>
.m_profileContainer{
  margin-top: 15px;
  margin-left: 70px;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
}
.m_profilePageHeader{
  font-weight: 500;
    color: #323338;
    font-size: 24px;
    letter-spacing: -0.2px;
    line-height: 32px;
}
</style>