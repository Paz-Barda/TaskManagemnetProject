<template>
  <div class="m_tasksList"> 
    <div class="m_tasksListContainer">
        <div class="m_boardHeader">
          <v-row>
            <v-col cols=1 class="m_backButton">
              <div class="m_closeButton" v-on:click="closeBoard">
                X
              </div>
            </v-col>
            <v-col cols=10 class="m_boardTitle">
              {{boardDetails.boardName}}
            </v-col>
          </v-row>
        </div>

        <v-row>
          <v-col cols="7" class="m_boardCreatedBy">
            <div class="m_boardCreatedByName">
              Created by: {{boardDetails.userName}}
            </div>
          </v-col>
        </v-row>

        <appAddTaskButton :boardId="boardId"/>

        <appTasksListTable :tasksList="tasksList"/>

        

    </div>
  </div>
</template>

<script>
import TasksListTable from "./TasksListTable";
import AddTaskButton from "./AddTaskButton";
export default {
  components:{
    appTasksListTable:TasksListTable,
    appAddTaskButton:AddTaskButton
  },
  data() {
    return {
      boardDetails: "No board yet",
      boardId: "No board yet",
      tasksList: "No tasks yet"
    }
  },
  methods: {
    //Getting the list of the tasks
    getTasks(){
      const board_id= window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      this.boardId = board_id
    },
    closeBoard(){
      this.$router.push('/myProfile');
    }
  },
  mounted(){
    this.getTasks();
  },
  created(){
    const board_id= window.location.href.substring(window.location.href.lastIndexOf('/') + 1); //Getting the BoardId for the api call
    this.$store.dispatch('getSingleBoardData',board_id)
  },
  watch:{
    //When the state of the board data was changed update the board details
     '$store.state.boardData'(value){
       console.log(value);
      this.boardDetails = this.$store.getters.getBoardData
    },
    //Used when we are creating new task or deleting and then we need to update the tasks list.
    '$store.state.tasksList'(value){
      console.log(value);
      this.tasksList = this.$store.getters.gettasksList;
    }

  }
  
}
</script>

<style scoped>
.m_tasksList{
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-left: 80px;
  background: rgba(103, 104, 121, 0.445);
  z-index: 9;
}

.m_tasksListContainer{
  background: white;
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 10px 0px #fff;
}

.m_boardHeader{
  display: block;
  height: 60px;
  padding: 20px 0px 0px 15px;
  box-shadow: 0px -18px 0px #fff;
  border-bottom: 1px solid #e6e9ef;
}

.m_backButton{
  max-width:40px
}

.m_closeButton{
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

.m_boardTitle{
  width: 100%;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: 1px solid transparent;
  color: rgb(0, 134, 192);
  font-size: 18px;
  font-weight: 300;
}

.m_boardCreatedBy{
  margin: 10px 20px;
}
.m_boardCreatedByName{
  border: 1px solid white;
  font-size: 14px;
  padding: 2px 5px;
  background: rgb(0, 134, 192);
  display: inline-block;
  border-radius: 10px;
  color: white;
  font-weight: 600;
}

</style>