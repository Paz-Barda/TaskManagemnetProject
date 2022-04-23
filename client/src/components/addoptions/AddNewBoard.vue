<template>
  <div class="m_addNewBoard">
    <appAddBoardForm/>
  </div>
</template>

<script>
import AddBoardForm from './AddBoardForm'
export default {
  components:{
    appAddBoardForm: AddBoardForm
  },
  name:'AddNewBoard',
  created(){
  }
}
</script>

<style scoped>
.m_addNewBoard{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(103, 104, 121, 0.384);
  z-index: 9;
}
</style>