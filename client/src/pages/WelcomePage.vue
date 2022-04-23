<template>
  <div class="container m_welcomePage">
    <v-row>

      <v-col class="m_welcomeDashborad" cols="12" xs="12" sm="7" md="12">
        <appWelcomeDashborad></appWelcomeDashborad>
      </v-col>

      <v-col class="m_loginForm" cols="12" xs="12" sm="5" md="12">
        <Login/>
      </v-col>
    </v-row>
    
  </div>
</template>


<script>
import Login from '../components/WelcomePageComponents/Login.vue';
import WelcomeDashborad from '../components/WelcomePageComponents/WelcomeDashborad.vue';
  export default{
    components:{
      Login:Login,
      appWelcomeDashborad: WelcomeDashborad
    },
    created() {
      //When the application is loading on the welcome page dashborad we are validated that the user is looged out and all the data is deleted from the local storage.
      //we are useing an action from the store. 
     this.$store.dispatch('check_loged_user') 
    }

  }
</script>


<style scoped>
.m_welcomePage{
  margin-top: 100px;
}

.m_welcomeDashborad{
  margin-bottom: 50px;
}

@media only screen and (max-width: 960px) and (min-width: 600px){
.m_loginForm{
  width: 100%;
}
}
</style>