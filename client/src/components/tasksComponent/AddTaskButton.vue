<template>
<div>
    <div class="m_addTaskButton" v-on:click="addNewTask">
      {{buttonText}}
    </div>

  <router-view></router-view>
</div>
</template>

<script>
export default {
  props:['board_id'],
  data() {
    return {
      addTask:true,
      buttonText:"Add New Task"
  
    }
  },
  methods: {
    addNewTask(){
      if(this.addTask){
        this.buttonText = "Close"
        this.addTask = false;
        const board_id= window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        this.$router.push(`/myProfile/Board/${board_id}/AddTask`)
      }else{
        this.buttonText="Add New Task";
        this.addTask = true;
        this.$router.push(`/myProfile/Board/${this.board_id}`)
      }
      
    }
  },
  
}
</script>


<style scoped>
.m_addTaskButton{
  margin: 0px 20px 20px;
  padding: 2px 5px;
  border-left: 3px solid rgba(0, 128, 0, 0.575);
  background: rgba(119, 119, 119, 0.089);
  font-weight: 500;
  width: 120px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.144);
}

.m_addTaskButton:hover{
  cursor: pointer;
  background: rgba(0, 128, 0, 0.575);
  color: white;
}
</style>