<template>
<!-- Single record (row) of the board list this row will show the name of the project, owner, assgined, edit button-->
  <div>  
    
    <v-row class="m_boardDetil">
      <v-col v-on:click="showTask(boardInfo._id)" xs="5" sm="5" md="5" class="m_boardFiled">{{boardInfo.boardName}}</v-col>
      <v-col xs="4" sm="4" md="4" class="m_boardFiled">{{boardInfo.userName}}</v-col>
      <v-col xs="2" sm="2" md="2" class="m_boardFiled">Assgin user</v-col>

 
      <v-col xs="1" sm="1" md="1" class="m_boardFiled">
        <!-- When selecting the edit button wr are getting the data about the board togther with a delete option -->
        <router-link :to="`/myProfile/EditBoardData/${this.boardInfo._id}`" class="m_editButton">Edit</router-link>  
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  props:['boardInfo'],
  components:{
  },
  data() {
    return {
    }
  },
  methods: {
    showBoardData(){
      console.log(this.boardInfo);
    },
    //When ckicking on the project name we are moving to a new routh with data tasks of the selected board
    showTask(boardId){
      this.$router.push(`/myProfile/Board/${boardId}`)

    }
  },
  
}
</script>

<style scoped>
.m_boardDetil{
border-left: 7px solid rgb(0, 134, 192);
margin: 1px 0px;
background: #e6e9ef;
    border-bottom: 1px solid;
    border-bottom-color: #fff;
}

.m_boardFiled{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
  border-right: 1px solid;
  border-right-color: #fff;
}

.m_editButton{
  text-align: center;
  display: block;
  width: 100%;
  text-decoration: none; 
  color:#323338;
}

.m_boardDetil:hover{
  cursor: pointer;
  background: #d9d9d9;
  color: #0073ea;
}
</style>