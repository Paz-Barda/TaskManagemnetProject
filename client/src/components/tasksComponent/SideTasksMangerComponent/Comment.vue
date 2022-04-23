<template>
<!-- Single comment out of the comments list -->
  <div class="comment_container">
    <div class="m_commentUser">{{data.user}}</div>
    <div class="m_commentContent">{{data.content}}</div>
    <div class="m_commentDate">{{data.time}}</div>
  </div>
</template>


<script>
export default {
  props:['data']
  
}
</script>

<style scoped>
.comment_container{
  /* border: 1px solid red; */
  background: #f5f6f8;
  border-radius: 16px;
  padding: 10px 16px 25px 16px;
  color: #323338;
  margin-bottom: 10px;
}

.m_commentUser{
  font-weight: 600;
  vertical-align: top;
  margin-right: 3px;
  color: #0085ff;
}

.m_commentContent{
  display: block;
}
.m_commentDate{
  display: inline;
  float: right;
}
</style>