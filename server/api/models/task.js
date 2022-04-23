const mongoose = require('mongoose');


//Model of the task contain task-name, description, createon date, user name, created by (type user), 
//board id of type board each task needs to be linked to a board, status, assignedTo array of users, comments array of comments by the users.
const taskSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId, 
  taskName:{
    type:String,
    required:true
  },
  taskDescription:{
    type:String,
    default:'Enter task description'
    // required:true,
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
    boardId:{
    type : mongoose.Schema.Types.ObjectId, ref: 'TaskBoard', required:true
  },
  taskStatus:{
    type:String, 
    required:true
  },
  assignedTo:{
    type : [mongoose.Schema.Types.ObjectId], ref: 'User', required:true
  },
  comments:{
    type:Array,
    "default":[]
  },
  dueDate:{
    type: String
  }
});

module.exports = mongoose.model('Task', taskSchema);