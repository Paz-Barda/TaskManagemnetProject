<template>
      <v-row no-gutters v-bind:class="{showHeader: this.$store.getters.getUser ? true: false}" class="m_header">

        <v-col class="m_logo" :cols="3">
          <div class="m_headerPositions">
            <div class="logo">
              <b class="m_blinking">P</b>asana.com
            </div>
          </div>
        </v-col>


        <v-col cols="5" sm="6">
        </v-col>


        <v-col class="m_buttons" cols="3">
        <div class="m_headerPositions"  v-on:click="getStarted">
          <app-buttons title="Get Started"></app-buttons>
        </div>
        </v-col>

      </v-row>
</template>

<script>
import Buttons from '../WelcomePageComponents/Buttons.vue'
export default {
  components:{
    appButtons: Buttons
  },
  data() {
    return {
    }
  },
  methods: {
     getStarted:function(){
       this.$router.push('/signUp') 
    }
  },
  mounted() {
  },
  created(){
  }
  
  
}
</script>


<!-- v-bind:class="{dis: this.$store.getters.getUser ? false: true}" -->

<style scoped>
.border{
  border:1px solid red;
}

.m_header{
  height: 50px;
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  color: #333;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
}


.m_headerPositions{
display: block;
position: relative;
width: 80%;
margin: auto;
top: 20%;
}

.logo{
  position: relative;
  font-size: 1.7em;
  text-align: center;
  color: rgba(51, 51, 51, 0.918);
}

.m_blinking{
  -webkit-animation:colorchange 20s infinite alternate;
}

 @-webkit-keyframes colorchange {
      0% {
        
        color: blue;
      }
      
      10% {
        
        color: #8e44ad;
      }
      
      20% {
        
        color: #1abc9c;
      }
      
      30% {
        
        color: #d35400;
      }
      
      40% {
        
        color: blue;
      }
      
      50% {
        
        color: #34495e;
      }
      
      60% {
        
        color: blue;
      }
      
      70% {
        
        color: #2980b9;
      }
      80% {
     
        color: #f1c40f;
      }
      
      90% {
     
        color: #2980b9;
      }
      
      100% {
        
        color: pink;
      }
    }

.m_signUpButton{
  border: 1px solid black;
  text-align: center;
  width: 100px;
  height: 33px;
  border-radius: 25px;
  margin: auto;
  padding-top: 5px;
}

.showHeader{
  display: none;
}
</style>