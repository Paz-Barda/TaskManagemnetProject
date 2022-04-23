<template>
<!-- When pressing on the edit button show detaild about the board and ption to delete this board -->
  <div class="m_editBoard">
    <div class="m_editBoardBox">
      <div class="m_label">Board Name:</div>
      <div class="m_filedData">{{boardDetails.boardName}}</div>

      <div class="m_label">Created By:</div>
      <div class="m_filedData">{{boardDetails.userName}}</div>

      <div class="m_label">Creation Date:</div>
      <div class="m_filedData">{{boardDetails.createdDate}}</div>


      <div class="m_deleteBoard" v-on:click="deleteBoard">
        DELETE BOARD
      </div>

      <div class="m_clodeBoardData" v-on:click="closeBoardData">
        CLOSE
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router';
export default {
  data() {
    return {
       boardDetails: "temp"
    }
  },
  methods: {
    // When selecting delete button then delete the board using dispatch deleteBoard from store and passing the board id.
    deleteBoard(){
       const board_id= window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
       this.$store.dispatch('deleteBoard',{"board_id": board_id, "user": this.$store.getters.getUser })

    },
    closeBoardData(){
      //When closing the board edit then return to the main page
      router.push('/myProfile')
    }
  },
  created(){
    //When the component created we are calling the getSingleBoardData with the board_id.
    const board_id= window.location.href.substring(window.location.href.lastIndexOf('/') + 1); //Getting the BoardId for the api call
    this.$store.dispatch('getSingleBoardData',board_id)
  },
  watch:{
     '$store.state.boardData'(value){
       console.log(value);
      this.boardDetails = this.$store.getters.getBoardData
      console.log( this.boardDetails);
    },
  }
}
</script>

<style scoped>
.m_editBoard{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(103, 104, 121, 0.384);
  z-index: 9;
}

.m_editBoardBox{
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  border: 1px solid #e6e9ef;
  border-radius: 10px;
  background: white;
  box-shadow: 0px 0px 10px 0px #292f4c;
  width: 300px;
  height: 300px;
  margin: 50px auto;
  padding: 10px;
}

.m_label{
  display: flex;
  width: 100%;
  margin: 15px 0px 2px;
  font-weight: 600;
  color: #676879;
  border-left: 5px solid rgb(202, 182, 65);
}

.m_filedData{
  width: 100%;
}

.m_deleteBoard, 
.m_clodeBoardData{
  text-align: center;
  margin-top: 20px;
  padding: 5px 0px;
  border-radius: 5px;
  color: #676879;
}

.m_deleteBoard{
border: 1px solid red;
}

.m_deleteBoard:hover{
border: 1px solid black;
background: red;
cursor: pointer;
color: white;
box-shadow: 0px 0px 10px 0px #00000054;

}
.m_clodeBoardData{
  border: 1px solid green;
}

.m_clodeBoardData:hover{
  border: 1px solid black;
  background: green;
  cursor: pointer;
  color: white;
  box-shadow: 0px 0px 10px 0px #00000054;
}
</style>