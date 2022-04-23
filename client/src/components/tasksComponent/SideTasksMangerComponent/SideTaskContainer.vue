<template>
  <div class="m_sideTaskCnotainer">

    <div class="m_closeButtonContainer">
      <div class="m_closeButton" v-on:click="closeTask">
        X
      </div>
    </div>

    <div class="m_taskTitle">
      {{taskData.taskName}}
    </div>

    <div class="m_taskCreatedBy">
       Created by: {{taskData.userName}}
    </div>


    <div class="m_taskDetails">
      <appTaskDescription  :taskData="taskData"/>
    </div>

    <appListOfComments class="m_listOfComments" :comments="taskData.comments"/>

  </div>
</template>

<script>
import TaskDescription from "./TaskDescription";
import ListOfComments from "./ListOfComments";
export default {
  components:{
    appTaskDescription: TaskDescription,
    appListOfComments: ListOfComments
  },
  data() {
    return {
      taskData: 'No task data'
    }
  },
  methods: {
    getTaskDetails(){
      const taskId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      this.$store.dispatch('getTaskDetails', taskId)
    },
    closeTask(){
      const boardId= this.taskData.boardId; 
      this.$router.push(`/myProfile/Board/${boardId}`)
    }
  },
  created() {
    //When the component created then call getTaskDetails
    this.getTaskDetails();
  },
  watch:{
    //Watch the task state if the task state changed then update task details
    '$store.state.task'(value){
      console.log(value);
      this.taskData = this.$store.getters.getTaskData.result[0];
    },
    //Watching the router params on the window then dispatch getTaskDetails with the task id 
    '$route.params.taskId'(){
      const taskId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      this.$store.dispatch('getTaskDetails', taskId)
    }
  },
  mounted() {
    this.getTaskDetails();
  }
}
</script>


<style scoped>
.m_sideTaskCnotainer{
  position: fixed;
  width: 700px;
  height: 100%;
  top: 0;
  right: 0;
  background: #ffffff;
  z-index: 20;
  box-shadow: 0px 0px 10px 0px #292f4c;
  padding: 20px;
}

.m_closeButton{
  line-height: 24px;
  text-align: center;
    height: 24px;
    width: 24px;
    font-size: 18px;
    color: #777;
    justify-content: center;
    padding: 2px;
}

.m_closeButton:hover{
  cursor: pointer;
  background: #e6e9ef;
  border-radius: 5px;
}

.m_taskTitle{
  width: 100%;
  margin: 10px 0px 2px 0px;
  line-height: 24px;
  font-size: 20px;
  font-family: Roboto,sans-serif;
  font-weight: 500;
  color: #323338;
}

.m_taskDetails{
  border-top: 1px solid #e6e9ef;
  border-bottom: 1px solid #e6e9ef;
}

.m_taskCreatedBy{
  display: inline-block;
  border-radius: 10px;
  padding: 1px 5px;
  font-size: 13px;
  color: white;
  background: rgb(21, 138, 6);
  font-weight: 600;
  margin-bottom: 5px;
}

.m_listOfComments{
  height: 50%;
}

@media only screen and (max-width: 600px) {
  .m_sideTaskCnotainer {
    width: 100%;
  }
}
</style>