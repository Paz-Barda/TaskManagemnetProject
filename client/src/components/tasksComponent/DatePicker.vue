<template>
  <div class="m_datePicker">
    <appDatePickerForm/>
  </div>
</template>

<script>
import DatePickerForm from './DatePickerForm'
export default {
  components:{
    appDatePickerForm: DatePickerForm
  },
  name:'DatePickerForm',
  created(){}
}
</script>

<style scoped>
.m_datePicker{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(103, 104, 121, 0.384);
  z-index: 9;
}
</style>