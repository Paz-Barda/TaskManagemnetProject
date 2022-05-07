<template>
<!-- When pressing on the edit button show detaild about the Task and option to delete this Task -->
  <div class="m_editTask">
    <div class="m_editTaskBox">
      <div class="m_label">Task Name:</div>
      <div class="m_filedData">{{taskDetails ? taskDetails.taskName : "."}}</div>

      <div class="m_label">Created By:</div>
      <div class="m_filedData">{{taskDetails ? taskDetails.userName : "."}}</div>

      <div class="m_label">Creation Date:</div>
      <div class="m_filedData">{{taskDetails ? taskDetails.createdDate : "."}}</div>

      <div class="m_deleteTask" v-on:click="deleteTask">
        DELETE TASK
      </div>

      <div class="m_clodeTaskData" v-on:click="closeTaskData">
        CLOSE
      </div>
    </div>
  </div>
</template>

<script>
// import router from '../../router';
export default {
  data() {
    return {
       taskDetails: this.$store.getters.getTaskData,
       taskList: this.$store.getters.gettasksList
    }
  },
  methods: {
    // When selecting delete button then delete the board using dispatch deleteBoard from store and passing the board id.
    deleteTask(){
        this.$store.dispatch('deleteTask',{"board_id":this.$route.params.id,"task_id":this.$route.params.taskId})
        this.$router.go(-1);
    },
    closeTaskData(){
      //When closing the board edit then return back
        this.$router.go(-1);
    },
  },
  created(){
    //When the component created we are calling the getSingleBoardData with the board_id.
    const task_id= this.$route.params.taskId;
    this.$store.dispatch('getTaskDetails',task_id)
  },
  watch:{
     '$store.state.task'(value){
        console.log(value);
        this.taskDetails = this.$store.getters.getTaskData
        this.taskDetails = this.taskDetails.result[0]
    }
  }
}
</script>

<style scoped>
.m_editTask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(103, 104, 121, 0.384);
  z-index: 9;
}

.m_editTaskBox{
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  border: 1px solid #e6e9ef;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 10px 0px #292f4c;
  width: 300px;
  height: 300px;
  margin: 50px auto;
  padding: 10px;
}

.m_label{
  display: flex;
  width: 100%;
  margin: 15px 0px 2px;
  font-weight: 600;
  color: #676879;
  border-left: 5px solid rgb(202, 182, 65);
}

.m_filedData{
  width: 100%;
}

.m_deleteTask, 
.m_clodeTaskData{
  text-align: center;
  margin-top: 20px;
  padding: 5px 0px;
  border-radius: 5px;
  color: #676879;
}

.m_deleteTask{
border: 1px solid red;
}

.m_deleteTask:hover{
border: 1px solid black;
background: red;
cursor: pointer;
color: white;
box-shadow: 0px 0px 10px 0px #00000054;

}
.m_clodeTaskData{
  border: 1px solid green;
}

.m_clodeTaskData:hover{
  border: 1px solid black;
  background: green;
  cursor: pointer;
  color: white;
  box-shadow: 0px 0px 10px 0px #00000054;
}
</style>