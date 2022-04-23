<template>
  <div>
    <div class="m_label">{{this.fields[index]}}</div>
    <input v-bind:class="{notDispaly: this.index === 0? false: true}" class="m_inputBox" v-model="name" :placeholder="this.placeHolderFldes[0]">

    <input v-bind:class="{notDispaly: this.index === 1? false: true}" class="m_inputBox" v-model="email" :placeholder="this.placeHolderFldes[1]">

    <input v-bind:class="{notDispaly: this.index === 2? false: true}" class="m_inputBox" v-model="password" :placeholder="this.placeHolderFldes[2]" type="password">

    <input v-bind:class="{notDispaly: this.index === 3? false: true}" class="m_inputBox" v-model="validatePassword" :placeholder="this.placeHolderFldes[3]" type="password">

    <div v-bind:class="{ active: isActive, alert }">{{alert[index]}}</div>
    <div class="m_signUpButton" v-on:click="nextFiled">{{buttonLabels[buttonLabelindex]}}</div>
    
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      fields:['Name','Enter Email', 'Password', 'Validate Password'],
      placeHolderFields:['Example: Paz', 'Example@gmail.com','*******', '*******'],
      buttonLabels:['Next', 'Create User'],
      alert:['Plese enter name', 'Enter email', 'Enter password', 'Enter password again'],
      buttonLabelindex: 0,
      index:0,
      name:undefined,
      email:undefined,
      password:undefined,
      validatePassword:undefined,
      isActive: true
    }
  },
  methods: {
    nextFiled:function(){
      if(this.index<4){
      //Check name
      if(this.fields[this.index] === 'Name'){
        if(this.name === undefined){
          this.isActive = false;
          return;
        }
      }
      if(this.fields[this.index] === 'Enter Email'){
        if(this.email === undefined){
          this.isActive = false;
          return;
        }
      }
      if(this.fields[this.index] === 'Password'){
        if(this.password === undefined){
          this.isActive = false;
          return;
        }
      }
      if(this.fields[this.index] === 'Validate Password'){
        if(this.validatePassword === undefined){
          this.isActive = false;
          return;
        }
      }
        this.isActive = true;
        this.index++;
    }

      //if the index is alredy 4 means that the user enterd all the fields and we can create the new user
      if(this.index === 4){

        console.log(this.name + ' ' + this.email + ' ' +this.password);
        axios.post('http://localhost:3000/users/signUp',{
          "name": this.name,
          "email":this.email,
          "password":this.password
        })
        .then(res=>{
          console.log(res);
          alert('User was created sucsspuly');
          this.$router.push('/') 
        })
        .catch(err=>{
          console.log(err);
        })
      }        
        if(this.index === 3){
          this.buttonLabelindex = 1;
        }
      }
    }
  }
</script>

<style scoped>
.m_label{
  font-weight: 300;
  font-size: 14px;
}
.m_inputBox{
  border: 1px solid #c5c7d0;
  width: 300px;
  margin-top: 10px;
  height: 35px;
  padding: 2px 5px;
  border-radius: 8px;
}

.m_signUpButton{
  width: 300px;
  border: 1px solid #0085ff;
  border-radius: 8px;
  background-color: #0085ff;
  color: white;
  text-align: center;
  margin-top: 25px;
  height: 35px;
  padding: 7px;
}
.m_signUpButton:hover{
cursor: pointer;
  color: rgba(187, 185, 185, 0.932);
}

.alert{
  margin-top: 5px;
  font-size: 13px;
  color: red;
  font-weight: 600;
}

.active{
  display: none;
}

.notDispaly{
display: none;
}


@media only screen and (max-width: 600px) and (min-width: 360px){
  .m_signUpButton{
    margin: 20px auto;
  }
}
</style>