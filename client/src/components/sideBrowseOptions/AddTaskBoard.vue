<template>
  <div class="m_addOption">
    <div class="m_addNewBoard">
      <router-link to="/myProfile/AddNewBoard" style="text-decoration: none; color:#323338">Add New board</router-link> 
    </div>
    
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.m_addOption{
  margin-top: 3px;
  border: 1px solid;
  border-color: #e6e9ef;
  background: #fff;
}

.m_addNewBoard{
justify-content: start;
    padding-left: 6px;
    height: 32px;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #323338;
    margin: 1px;
    border-radius: 5px;
    padding-top: 3px;
}

.m_addNewBoard:hover{
  background: #0084ff65;
  cursor: pointer;
}

</style>