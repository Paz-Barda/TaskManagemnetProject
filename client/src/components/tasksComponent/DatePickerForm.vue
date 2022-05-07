<template>

  <div class="m_datePickerForm"> 
       <div class="m_label">DueDate:
            <v-date-picker class="m_datePicker"
            v-model="dueDate"
            @change="menu1 = false"
          ></v-date-picker>
      </div>
            <div  v-on:click="setDueDate" style="display: inline-block;">
                <app-button class="m_formButtons" title="Set"></app-button>
            </div>
             <div  v-on:click="close" style="display: inline-block;">
                <app-button class="m_formButtons" title="Close"></app-button>
            </div>
  </div>
</template>


<script>
import Buttons from '../WelcomePageComponents/Buttons.vue';
// import router from '../../router';
import moment from 'moment';
import { format, parseISO } from 'date-fns';
export default {
  components:{
    appButton:Buttons
  },
  data() {
    return {
      dueDate: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      menu1: false
    }
  },
  methods: {

    //When user clicking on the create button the call function if the user didnt add a board name then shoe alert else dispatch add_new_board from store
    setDueDate(){
      if(this.dueDate<format(parseISO(new Date().toISOString()), 'yyyy-MM-dd')){
        alert('Please choose a valid date')
      }else{
        this.$store.dispatch('addDueDateToTask',{ date: this.dueDate, taskId: this.$route.params.taskId});
      }
    },
    close(){
      this.$router.go(-1);
    }
    },
    computed: {
      computedDateFormattedMomentjs () {
        return this.dueDate ? moment(this.dueDate).format('dddd, MMMM Do YYYY') : ''
    }
    }}
</script>

<style scoped>
.m_datePickerForm{
  text-align: center;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  width: 33%;
  height: 500px;
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
.m_datePicker{
   display: inline-block;
   color: green;
    background: #f2f2f2;
    border: 1px solid #ddd;
    padding: 0em 1em 1em;
    margin-bottom: 2em;
}


@media only screen and (max-width: 960px) and (min-width: 410px){
  .m_datePickerForm{
    width: 70%;
    margin: 40px auto;
  }

@media only screen and (max-width: 410px) and (min-width: 200px){
    .m_datePickerForm{
    margin: 50px 5px;
    width: 90%;
  }
.m_formButtons{
  margin: 50px 5px;
  display: inline-block;
}
@media only screen and (max-width: 960px) and (min-width: 410px){
  .m_datePickerForm{
    width: 70%;
    margin: 40px auto;
  }

  .m_formButtons{
  margin: 20px 2px;
  display: inline-block;
}
}

}}
</style>