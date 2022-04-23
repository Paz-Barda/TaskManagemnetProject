<template>
  <div class="m_dashConatianer">
    <div class="m_title">Track Without Limits</div>
    <div class="m_body">Easily track, monitor and manage, your team memers tasks on one platform. Lest start your new tasks with Pasana.com</div>
    <div  class="m_buttonRaprer" v-on:click="getStarted"><app-buttons title="Get Started"></app-buttons></div>
  </div>
</template>




<script>
import Buttons from './Buttons.vue'
export default {
  components:{
    appButtons: Buttons
  },
  methods: {
    getStarted:function(){
      this.$router.push('/signUp');
    }
  },
}
</script>





<style scoped>
.m_title{
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 72px;
}

.m_dashConatianer{
  color: #333;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  text-align: center;
  padding-inline: 10px;
}

.m_body{
  font-size: 1.75rem;
  line-height: 40px;
  word-break: break-word;
  font-weight: 400;
}

.m_buttonRaprer{
  margin-top: 30px !important;
  display: block;
  margin: auto;
}

@media only screen and (max-width: 960px) and (min-width: 600px){
.m_dashConatianer{
  text-align: left;
}
}

</style>