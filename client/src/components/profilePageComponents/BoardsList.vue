<template>
<!-- Container of the table for all the boards that will be listed below -->
  <div class="m_boardsContainer">
  <v-row>
    <v-col class="m_headerLabel" xs="5" sm="5" md="5">Name</v-col>
    <v-col class="m_headerLabel" xs="4" sm="4" md="4">Owner</v-col>
    <v-col class="m_headerLabel" xs="2" sm="2" md="2">Assgin</v-col>
    <v-col class="m_headerLabel" xs="1" sm="1" md="1">Edit</v-col>
  </v-row>


  <div class="m_boardsList">
    <!-- looping all the boards unser the my board list and show with the appBoardDetails components that will show a single record of the task -->
      <div v-for="board in this.myBoards" :key="board.index">
        <appBoardDetails :boardInfo = board></appBoardDetails>
      </div>
  </div>

  </div>
</template>

<script>
// import axios from 'axios';
import BoardDetails from './BoardDetails';
export default {
  components:{
    appBoardDetails: BoardDetails
  },
  data() {
    return {
      myBoards: 'No boards yet'
    }
  },
  methods: {
    getListOfAllBoards(){

      this.$store.dispatch('get_list_of_boards', {
        "user":this.$store.getters.getUser,
        "userId":this.$store.getters.getUser.id
      })

      // axios.get('rgneiri', {})
      // .then(res=>{res})
      // .catch(err=>{err})
    }
  },
  watch:{
    //Watching the state of the loged user if this state was updated then call getListOfAllBoards function 
      '$store.state.user'(value){
      this.getListOfAllBoards(value);
    },
    '$store.state.boards'(value){
      console.log(value);
      this.myBoards = this.$store.getters.getBoardsList
    }
  }
  
}
</script>


<style scoped>
.m_boardsContainer{
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  margin-top: 20px;
  text-align: left;
}

.m_boardsList{
  margin-top: 5px;
  text-align: left;
  height: 100%;
  overflow:hidden; 
  overflow-y:scroll;
  padding: 2px;
}

.m_headerLabel{
  color: #676879;
}

</style>
