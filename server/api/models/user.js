const mongoose = require('mongoose');


//Model of user: name, email, password, list of the projects array of the board-ids. 
const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId, 
  name:{
    type:String,
    required:true
  },
  // userName:{
  //   type:String,
  //   required:true,
  //   unique:true
  // },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String, 
    required:true
  },
  myProjects:{
    type:[mongoose.Types.ObjectId], ref: 'TaskBoard'
  }
});

module.exports = mongoose.model('User', userSchema);