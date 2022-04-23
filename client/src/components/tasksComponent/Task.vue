<template>
<!-- Show singel row of the task out of all the tasks -->
  <div class="m_taskRowContainer">
    <v-row class="m_taskRow">
      <v-col class="m_colValue" xs="4" sm="4" md="4" v-on:click="openTask(taskData._id, taskData.boardId)">{{taskData.taskName}}</v-col>
      <v-col class="m_colValue" xs="2" sm="2" md="2">{{taskData.taskStatus}}</v-col>
      <v-col class="m_colValue m_addUser" xs="3" sm="3" md="3" @click="addUserToTask(taskData._id,taskData.boardId)">{{listofUsers}}</v-col>
      <v-col class="m_colValue" xs="2" sm="2" md="2" @click="addDueDateToTask(taskData._id,taskData.boardId)">{{taskData.dueDate}}</v-col>
      <v-col class="m_colValue" xs="1" sm="1" md="1">Edit</v-col>
     
    </v-row>
  </div>
</template>

<script>
// import { format, parseISO } from 'date-fns';
export default {
  props:['taskData'],
data(){
  return{
        listofUsers: [null]
  }
},
  methods: {
    openTask(taskId, boardId){
      this.$router.push(`/myProfile/Board/${boardId}/${taskId}`)
    },
        addUserToTask(taskId, boardId){
      this.$router.push(`/myProfile/Board/${boardId}/${taskId}/AssignUser`);
    },
        addDueDateToTask(taskId, boardId){
      this.$router.push(`/myProfile/Board/${boardId}/${taskId}/DueDate`);
    }
  },
  }
</script>

<style scoped>
.m_taskRowContainer{
  width: 100%;
}
.m_taskRow{
    border-left: 7px solid rgb(21, 138, 6);
    margin: 1px 0px;
    background: #e6e9ef;
    border-bottom: 1px solid;
    border-bottom-color: #fff;
}


.m_taskRow:hover{
  cursor: pointer;
  background: #d9d9d9;
  color: #0073ea;
}

.m_colValue{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  border-right: 1px solid;
  border-right-color: #fff;
}


.m_addUser:hover{
  color:green;
  font-weight: bold;
}
</style>




