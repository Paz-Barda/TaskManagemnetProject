<template>
<!-- This side header will be shoewd only when the user is looged in to the app -->
  <div v-bind:class="{showSideHeader: this.$store.getters.getUser ? false: true}">
    <div class="sidenav">
      <div class="m_logo">P.</div>

      <div class="m_browsingLogo" v-on:click="showBrowser = !showBrowser">
        <img class="m_browsImage" alt="" :src="require('../../assets/images/sideheader/browsing.png')">
      </div>

    <div class="m_userIcon">
      <div class="m_letter">
        {{this.user.name.charAt(0).toUpperCase()}}
      </div>
    </div>

    </div>

    <appSideBrowse v-bind:class="{m_showBrows: showBrowser ? false: true}" :userDetails="user"></appSideBrowse>
  </div>

</template>

<script>
import SideBrowse from './../sideBrowseOptions/SideBrowse';
export default {
  components:{
    appSideBrowse: SideBrowse
  },
  data() {
    return {
      user: null,
      showBrowser: false
    }
  },
  methods: {
    setUser(){
      this.user = this.$store.getters.getUser
      console.log(this.$store.getters.getUser);
    }
  },
  watch:{
    //Watching on the state of the user in the store if the state was changed to new data then we are calling internal function setUser() and we are Getting the data of the user 
    '$store.state.user'(value){
      this.setUser(value);
    }
  },
  
}
</script>

<style scoped>
.showSideHeader{
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  display: none;
}

.m_userIcon{
  border: 2px solid white;
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 0px;
  margin: 40px 5px;
  border-radius: 50px;
  text-align: center;
  background: #297fb942;
  color: white;
}

.m_letter{
  margin: 10px auto;
  font-size: 22px;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
  justify-content: center;
}
.m_logo{
  /* border: 1px solid red; */
  width: 45px;
  height: 45px;
  margin: auto;
  -webkit-animation:colorchange 20s infinite alternate;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  font-family: sofia-pro,Roboto,Helvetica,Arial,sans-serif;
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


.sidenav {
  height: 100%;
  width: 65px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: #1d3557;
  overflow-x: hidden;
  padding-top: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.m_browsingLogo{
  width: 50px;
  height: 50px;
  margin: 20px 5px;
  border: 1px solid white;
  border-radius: 50px;
  background: white;
}

.m_browsingLogo:hover{
  border: 1px solid blue;
  transform: scale(1.1);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

.m_browsImage{
  margin: 8px;
}

.m_showBrows{
  display: none;
}
</style>