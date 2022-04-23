const mongoose = require('mongoose');

//Model of task board (project), contain board-name , createdDate, user name the owner each board have one owner the one that created the board,
//assginedTo (The users that takes part of the project or assgined to the tasks in it), tasks array of the task-ids in the board
const tasksBoardSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId, 
  boardName:{
    type:String,
    required:true
  },
  createdDate:{
    type:Date,
    required:true
  },
  userName:{
    type:String,
    required:true
  },
  createdBy:{
    type : mongoose.Schema.Types.ObjectId, ref: 'User', required:true
  },
  assginedTo:{
    type:[mongoose.Schema.Types.ObjectId],  ref: 'User', required:true
  },
  tasks:{
    type:[mongoose.Schema.Types.ObjectId],  ref: 'Task', required:true
  }
});

module.exports = mongoose.model('TaskBoard', tasksBoardSchema);