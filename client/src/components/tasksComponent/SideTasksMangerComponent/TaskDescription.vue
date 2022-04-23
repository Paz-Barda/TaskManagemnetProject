<template>
<!-- Adding task description form -->
  <div>
    <div>
        <textarea class="m_textInput" rows="6" cols="100%" v-model="taskData.taskDescription"></textarea>
        <div class="m_saveTaskDescription" v-on:click="saveTaskDescription">save</div>
    </div>


    <div>
      <app-add-comment/>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import AddComment from './AddComment';
export default {
  props:['taskData'],
  components:{
    appAddComment: AddComment
  },
  data() {
    return {
      taskDetails:this.taskData.taskDescription
    }
  },
  methods: {
    saveTaskDescription(){
      console.log(this.taskDetails);
      const user = localStorage.getItem('user');
      const taskId =  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

      //update the task description using the patch task/${taskId} endpoint.
       axios.patch(`http://localhost:3000/task/${taskId}`,{'description': this.taskData.taskDescription},{
          headers:{
        'user': user
        }
       })
       .then((res)=>{
         console.log(res);
       })
       .catch((err)=>{
         console.log(err);
       })
    }
  },
  
}
</script>


<style scoped>
.m_textInput{
  padding: 10px;
  width: 100%;
  color: #676879;
}

.m_saveTaskDescription{
  width: 50px;
  text-align: center;
  color: white;
  padding: 1px 3px;
  border-radius: 10px;
  margin: 5px 0px;
  font-weight: 600;
  background: rgb(0 134 199);
}

.m_saveTaskDescription:hover{
  cursor: pointer;
  background: white;
  color:rgb(0 134 199);
}
</style>