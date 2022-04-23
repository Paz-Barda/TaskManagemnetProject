<template>
<!-- List of comments for a task -->
  <div class="m_commentsList">
    <div v-for="comment in comments" :key="comment.id">
      <appComment :data="comment"/>
    </div>
  </div>
</template>

<script>
import Comment from './Comment'
export default {
  props:['comments'],
  components:{
    appComment: Comment
  }
  
}
</script>

<style scoped>
.m_commentsList{
  margin-top: 10px;
  height: 70%;
  overflow-y:auto;
  overflow-y:scroll;
}
</style>