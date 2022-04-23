<template>
<!-- Show the form of the creating new board -->
  <div class="m_addBoardForm"> 
    <div class="m_title">Crate New Project Board</div>

    <v-form class="m_projectform">
       <div class="m_label">Progect name</div>
      <input class="m_inputBox" v-model="projectName" placeholder="Enter project name">
    </v-form>


    <div  v-on:click="createProjectBoard" style="display: inline-block;">
      <app-button class="m_formButtons" title="Create"></app-button>
    </div>
 

    <div  v-on:click="closeProjectBoardForm" style="display: inline-block;">
      <app-button class="m_formButtons" title="Close"></app-button>
    </div>


    

  </div>
</template>


<script>
import Buttons from '../WelcomePageComponents/Buttons.vue';
import router from '../../router';
export default {
  components:{
    appButton:Buttons
  },
  data() {
    return {
      projectName: null
    }
  },
  methods: {

    //When user clicking on the create button the call function if the user didnt add a board name then shoe alert else dispatch add_new_board from store
    createProjectBoard(){
      if(!this.projectName){
        alert('Please enter project name')
      }else{
        console.log(this.$store.getters.getUser);
        this.$store.dispatch('add_new_board', {
        "user":this.$store.getters.getUser,
        "boardName":this.projectName,
        "userId":this.$store.getters.getUser.id,
        "userName":this.$store.getters.getUser.name
        })
      }
    },

  //If the user want to close the create new board form insted of create.
    closeProjectBoardForm(){
      this.projectName = null;
      router.push('/myProfile')
    }
  },
}
</script>


<style scoped>
.m_addBoardForm{
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

.m_title{
  font-weight: 600;
  line-height: 24px;
  font-size: 1.25rem;
}


.m_label{
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  font-family: Roboto,sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #323338;

}

.m_inputBox{
  float: left;
  width: 90%;
  border: 1px solid blue;
  padding: 5px 2px;
  border-radius: 5px;
}

.m_formButtons{
  margin: 50px 5px;
  display: inline-block;
}
@media only screen and (max-width: 960px) and (min-width: 410px){
  .m_addBoardForm{
    width: 70%;
    margin: 40px auto;
  }

  .m_formButtons{
  margin: 20px 2px;
  display: inline-block;
}
}

@media only screen and (max-width: 410px) and (min-width: 200px){
    .m_addBoardForm{
    margin: 50px 5px;
    width: 90%;
  }
}
</style>