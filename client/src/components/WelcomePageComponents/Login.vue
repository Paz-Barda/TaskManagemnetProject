<template>
  <div class="m_loginForm">
    <div class="m_loginTitle">Log in to your account</div>

    <div class="m_loginContainer">
      <appLoginCarousel :loginScreen="loginFields" ></appLoginCarousel>
    </div>
  </div>
</template>

<script>
import LoginCarousel from './LoginCarousel.vue';
export default {
  components:{
    appLoginCarousel: LoginCarousel
  },
  data() {
    return {
      message: "Emter email here",
      loginFields:[{title:'Enter your email address', type:'String', placeholder:'Example@gmail.com'}, {title:'Enter your password', type:'Password'}],
      index: 0
    }
  },
  methods: {

  }
  
}
</script>

<style scoped>
.m_loginForm{
  text-align: center;
  color: #333;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
}

.m_loginTitle{
  font-size: 40px;
  font-weight: 100;
  margin-bottom: 8px;
  letter-spacing: -2px;
}

.m_loginContainer{
  margin-top: 30px;
}

</style>