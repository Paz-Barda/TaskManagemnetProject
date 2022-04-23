<template>
  <div class="m_addCommentContainer">
    <input v-model="commentData" class="m_inputCcomment" type="text" placeholder="Write a reply...">
    <div class="m_addCommentButton" v-on:click="addComment">+</div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      comment:'Wating for comment',
      commentData: undefined //'Adding comment'
    }
  },
  methods: {
    addComment(){
      const user = localStorage.getItem('user');
      const taskId =  window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
      var todayDate = new Date().toISOString().slice(0, 10);

      //Adding a comment the task bu calling task/comment/${taskId} and passing the content time and user
      axios.post(`http://localhost:3000/task/comment/${taskId}`,{
        'comment':{
          content: this.commentData,
          time: todayDate,
          user: JSON.parse(user).name
        }
      },{
        headers:{
        'user': user
        }
      })
      .then(res=>{
        console.log(res);
        //Call the getTaskDetails from store in order to update the task details and see the new added comment
        this.$store.dispatch('getTaskDetails', taskId)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
}
</script>


<style scoped>
.m_addCommentContainer{
  margin: 15px 0px 10px 0px;
  border: 1px solid #c5c7d0;
  border-radius: 25px;
  height: 30px;
  padding: 4px 5px;
}

.m_inputCcomment{
  width: 90%;
  padding: 0px 5px;
}

input:focus, textarea:focus, select:focus{
  outline: none;
}

.m_addCommentButton{
  width: 10%;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  bottom: 2px;
  background: rgb(0 134 199);
  color: white;
  font-weight: 500;
}

.m_addCommentButton:hover{
  cursor: pointer;
  background: white;
  color: rgb(0 134 199);
  border: 1px solid rgb(0 134 199);
}
</style>