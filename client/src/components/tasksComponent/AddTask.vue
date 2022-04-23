<template>
  <div class="m_addTaskContainer">
    <v-row>

        <v-col class="m_addTaskRow">
          <input class="m_taskNameInput" type="text" placeholder="+ Enter task name" v-model="task_name">
        </v-col>

        <v-col class="m_colAddButton">
          <div class="m_addButton" v-on:click="addNewTask">
            Add
          </div>
        </v-col>
        
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      task_name: null
    }
  },
  methods: {
    addNewTask(){
      // console.log(this.$route.params.id);
      this.$store.dispatch('addNewTask', {"boardId":this.$route.params.id, "taskName": this.task_name, })
    }
  },
}
</script>

<style scoped>
.m_addTaskContainer{
  margin: 20px;
}

.m_addTaskRow{
  margin-left: 12px;
  border-left: 3px solid rgb(0, 134, 192);
  background: rgba(119, 119, 119, 0.089);
  height: 30px;
  padding: 0px;
}

.m_taskNameInput{
  width: 100%;
  padding:2px;
  height: 100%;
}

.m_colAddButton{
  padding: 0px;
}
.m_addButton{
    width: 50px;
    display: inline-block;
    height: 30px;
    padding: 0px;
    text-align: center;
    background: rgb(0, 134, 192);
    color: white;
    padding: 5px 0px;
}

.m_addButton:hover{
  cursor: pointer;
  font-weight: 600;
}

input:focus, textarea:focus, select:focus{
  outline: none;
}

</style>