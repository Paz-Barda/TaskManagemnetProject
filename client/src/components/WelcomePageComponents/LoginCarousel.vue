<template>
  <div class="m_screenContainer">

    <div v-bind:class="{ active: !isActive }">
      <div class="m_label" >{{loginScreen[0].title}}</div>
      <input class="m_inputBox" v-model="email" :placeholder="this.loginScreen[0].placeholder">
    </div>

    <div v-bind:class="{ active: isActive }">
      <div class="m_label" >{{loginScreen[1].title}}</div>
      <input class="m_inputBox" v-model="password" :placeholder="this.loginScreen[1].placeholder" type="password">
    </div>

    <div class="m_nextButton"  v-on:click="nextScreen">
      {{buttonText[index]}}
    </div>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  props:['loginScreen'],
  components:{
  
  },
  data() {
    return {
      index:0,
      email:undefined,
      password:undefined,
      fields:[this.email, this.password],
      buttonText:['Next', 'Log-In'],
      isActive:true
    }
  },
  methods: {
    nextScreen:function(){
      if(this.buttonText[this.index] === 'Log-In'){

      //login function calling the log-in endpoint.
      axios.post('http://localhost:3000/users/logIn', {"email": this.email, "password": this.password})
      .then(res=>{
        console.log("this is result now:", res)
        if(res.status == 202){
          alert("wrong password")
        }
        else{
        console.log(res.data);
        this.$store.dispatch('loginUser', res.data);
        }
      })
      .catch(err=>{
        console.log(err);
      })

        return;
      }
      this.index++;
      this.isActive = false;
    }
  }
  
}
</script>


<style scoped>
.m_screenContainer{
  display:inline-block ;
  width: 350px;
  text-align: left;
}

.m_label{
  font-weight: 600;
}

.m_inputBox{
  border: 2px solid blue;
  width: 100%;
  margin-top: 10px;
  height: 40px;
  padding: 2px 5px;
}

@media only screen and (max-width: 960px) and (min-width: 600px){
.m_screenContainer{
  width: 100%;
}
}

.active{
  display: none;
}

.m_nextButton{
  margin-top: 20px !important;
  text-align: center;
  width: 150px;
  margin: auto;
  border-radius: 50px;
  font-size: 1.2rem;
  padding:3px 7px;
  background-color: #0085ff;
  color: white;
}

.m_nextButton:hover{
  cursor: pointer;
  color: rgba(187, 185, 185, 0.932);
  background-color: #025cb1;
}
</style>