<template>
  <div class="m_sideContainer">
    
    <div class="m_greating">
      My Workspace
    </div>

    <div class="m_userName">
      Hi {{user.name}}
    </div>

    <div class="m_BrowsOptions">

      <div class="m_option" v-on:click="showAddOption = !showAddOption">Add</div>
      <appAddTaskBoard v-bind:class="{m_showAddOption: showAddOption ? false: true}"/>

      <div class="m_option">Filter</div>
      <div class="m_option">search</div>
    </div>
  </div>
</template>

<script>
import AddTaskBoard from "./AddTaskBoard"
export default {
  props:['userDetails'],
  components:{
    appAddTaskBoard: AddTaskBoard
  },
  data() {
    return {
      user: this.userDetails,
      showAddOption:false
    }
  },
}
</script>



<style scoped>
.m_sideContainer{
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  z-index: 1;
  margin-left: 67px;
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #f5f6f8;
  overflow-x: hidden;
  padding-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 12px 13px -7px;
  padding: 20px 5px;
}

.m_userName{
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #0085ff;
  padding: 6px 3px;
  border-radius: 4px;
  background: #ffff;
}

.m_greating{
      font-size: 14px;
    font-weight: 400;
    color: #676879;
    padding: 0px 3px;
}

.m_BrowsOptions{
  margin-top: 15px;
  border-bottom: 1px solid;
  border-color: #e6e9ef;
}

.m_option{
    justify-content: start;
    padding-left: 6px;
    height: 32px;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #323338;
    margin-top: 1px;
    border-radius: 5px;
    padding-top: 3px;
}

.m_option:hover{
  background: #fff;
  cursor: pointer;
}

.m_showAddOption{
  display: none;
}
</style>