<template>
  <div>
    <v-row class="m_signUpCard">

       <v-col cols="12" xs="12" sm="1" md="1"></v-col>

      <v-col class="m_signUpForm" cols="12" sm="7" md="7">
        <div class="m_signUpTitle">Welcome to Pasana.com</div>
        <div class="m_feedLine">Let’s get started with a few simple steps</div>
        <appSignUpForm class="m_signForm" />
      </v-col>

      <v-col class="m_signUpImage" cols="12" xs="5" sm="3" md="3">
        <img class="m_image" :src="require('../../assets/images/signup/signup_page.jpg')" alt="">
      </v-col>

       <v-col cols="12" sm="1" md="1"></v-col>
    </v-row>
  </div>
</template>




<script>
import SignUpForm from './SignUpForm';
export default {
  components:{
    appSignUpForm: SignUpForm
  }
}
</script>





<style scoped>
.m_signUpForm{
  border: 1px solid gray;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
  height: 400px;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  padding: 30px 20px;
  color: #323338;
}

.m_signUpImage{
  border: 1px solid gray;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 0px !important;
}

.m_image{
  width: 100%;
  height: 100%;
  object-fit: fill;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.m_signUpTitle{
  font-size: 24px;
  font-weight: 600;
  
}

.m_feedLine{
  margin-top: 8px;
  font-weight: 400;
  color: #676879;
}

.m_signForm{
  margin-top: 20px;
}

@media only screen and (max-width: 600px) and (min-width: 360px){
.m_signUpImage{
  display: none;
}

.m_signUpForm{
  border: none;
  margin: 0 auto;
  text-align: center;
}
}
</style>