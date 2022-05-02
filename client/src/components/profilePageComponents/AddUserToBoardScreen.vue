<template>
  <div class="m_addUserToBoardForm">
    <div class="m_addUserForm">
      <div>Add User To Baord</div>
      
        <input class="m_userEmail" type="text" placeholder="Enter user email" v-model="userEmail">
      
      <div  v-on:click="addUserToBoard" style="display: inline-block;">
      <app-button class="m_formButtons" title="Add User"></app-button>
      </div>

      <div  v-on:click="close" style="display: inline-block;">
      <app-button class="m_formButtons" title="close"></app-button>
      </div>

    </div>
  </div>
</template>


<script>
import Buttons from '../WelcomePageComponents/Buttons.vue';
export default {
  components:{
    appButton: Buttons
  },
  data() {
    return {
      userEmail: null
    }
  },
  methods:{
    addUserToBoard(){
      if(!this.userEmail){
        alert('Please enter user email');
      }else{
        this.$store.dispatch('addUserToBoard', {email: this.userEmail, boardId: this.$route.params.id});
      }
    },
    close(){
      this.$router.go(-1);
    }
  },
  
}
</script>


<style scoped>
.m_addUserToBoardForm{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(103, 104, 121, 0.384);
  z-index: 9;
}

.m_addUserForm{
  text-align: center;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  width: 50%;
  height: 300px;
  margin: 5% auto;
  border: 1px solid #e6e9ef;
  border-radius: 20px;
  padding: 50px;
  background: white;
  box-shadow: 0px 0px 10px 0px #292f4c;
}

.m_userEmail{
  width: 90%;
  border: 1px solid blue;
  padding: 5px 2px;
  border-radius: 5px;
  margin-top: 20px;
}

.m_formButtons{
  margin: 10px;
}
</style>