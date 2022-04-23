<template>
  <div class="m_signUpPage container">
    <appSignUpCard></appSignUpCard>
  </div>
</template>

<script>
import SignUpCard from '../components/SignUpPage/SignUpCard.vue'
export default {
  components:{
    appSignUpCard: SignUpCard
  }
  
}
</script>



<style scoped>
.m_signUpPage{
  margin-top: 100px;
  background-color: #fff;
}

</style>