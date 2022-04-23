<template>
  <div class="m_buuton">
      {{this.text}}
  </div>
</template>


<script>
export default {
  props:['title'],
  data() {
    return {
      text: this.title
    }
  },
  computed:{
    textComputed(){
      console.log(this.text);
      return this.text;
    }
    
  }
}
</script>

<style scoped>
.m_buuton{
  border: 1px solid black;
  text-align: center;
  width: 110px;
  margin: auto;
  border-radius: 40px;
  font-size: 1.2rem;
  height: 33px;
  padding: 3px 5px;
  font-weight: 300;
  color: white;
  background-color: #0F1048;

}

.m_buuton:hover{
  color: rgba(187, 185, 185, 0.932);
  cursor: pointer;
}
</style>