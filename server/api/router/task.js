const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');
const { response } = require('express');
const task = require('../models/task');
const TaskBoard = require('../models/taskskBoard');
const { find } = require('../models/task');
const moment = require('moment');
const fns = require('date-fns');






//Creating new task 
router.post('/newTask', checkAuth, (req,res,next)=>{
  // console.log(req.body);
  //Creating object of task taht will store all the data that is passed buy the user from the client side.
  const task = new Task ({
    _id: new mongoose.Types.ObjectId(), 
    taskName: req.body.taskName, 
    taskDescription: req.body.description,
    createdDate: new Date(),
    createdBy: req.body.userId,
    userName: req.body.userName,
    boardId: req.body.boardId,
    taskStatus: 'New',
    dueDate: new Date()
    // userId: req.body.userId
  })

  task.save()
  .then((result)=>{
    //if the task was saved then we will return response with all the info about the new task that was created, and also a message.
    res.status(201).json({
      message:'Created new tesk',
      createdTask:{
        name: result.taskName,
        description:result.taskDescription,
        createdDate:result.createdDate,
        createdBy_id: result.createdBy,
        userName: result.userName,
        boardId: result.boardId,
        taskId: result._id,
        taskStatus: result.taskStatus,
        dueDate: result.dueDate
      }
    })
  })
  .catch((err)=>{
    //The task wasnt added then we will return a message of an error. 
    res.status(500).json({error: err})
  })
})

// developing use method only
router.get('/', (req,res,next)=>{
  Task.find({})
  .select('_id taskName taskDescription createdDate userName createdBy boardId taskStatus assignedTo comments dueDate')
  .then((result)=>{
    return res.status(200).json({
      result
    })
  })
  .catch((err)=>{
    return res.status(404).json({
      message:'No project yet'
    })
  })
});

//Get data about the task by passing the the task id, Check if the task exist in the DB if no eturn message.
//Else return info about the task 
router.get('/:taskId', checkAuth, (req,res,next)=>{
  const id = req.params.taskId;

  if(!Task.find({_id: id})){
    return res.status(500).json({
      message:"Task is not exist"
    })
  }else{
    Task.find({_id: id}).exec()
    .then((result)=>{
      return res.status(200).json({
        result
      })
    })
    .catch((err)=>{
      return res.status(500).json({
        message:'Error while trying to find the task'
      })
    });
  }
});


//Get all tasks the linked to a specific board (project), By passing the board-id.
router.get('/getAlltasksForBoard/:boardId', checkAuth, (req,res,next)=>{
  const boardId = req.params.boardId;
  console.log("this is the board id:" ,req.params.boardId)
  Task.find({boardId: boardId})
  .exec()
  .then((tasks)=>{
    console.log("this is the tasks" ,tasks.length)
    //If the user have boards projects then return the assgined board if no the return 0 and on the client side we will show a message.
    if(tasks.length > 0){
      return res.status(200).json({
        message:'All the projects that was assgined to you',
        tasks: tasks
      })
    }else{
      return res.status(200).json({
        message:'No projects',
        tasks: tasks
      })
    }
  })
  .catch((err)=>{
    console.log('Wasnt able to locate project');
    return res.status(500).json({
      error: err
    })
  })
});



//Adding users to a task
//First of all chek if the user is part of the DB if no reutrm message
router.patch('/:taskId/:UserEmail',checkAuth,(req, res, next)=>{
  const task_id= req.params.taskId;
  const user_email = req.params.UserEmail;

  // if(User.findOne({email: user_email})){
    User.find({email: user_email})
    .exec()
    .then(response=>{
      //if the length is 0 then the user is not part of the DB
      console.log(response.length)
      if(response.length ==0){
        return res.status(202).json({
          message:'User not exist in the system'
        })
      }else{
        //if the user was found
        //Then check if the user is alredy assgiend to the task if yes then we will find the task and return message that the user alredy assgiend to the task 
        //if the task return empty it means that the user is not assgiend to the task and we need to add the user to the task
        Task.findOne({_id:task_id ,assignedTo: response[0]._id})
        .exec()
        .then(task=>{
          const user_id = response[0]._id
          //if we get NULL in the task (result) it means that the task is not assgined to this user id and we need to add the user
          if(!task){
            Task.updateOne({_id: task_id}, { $push: {assignedTo: response[0]._id}})
            .exec()
            .then(response=>{
              console.log(response);
              Task.findOne({_id: task_id})
              .exec()
              .then(task=>{
                console.log(response);

                //if the task was assgined to the user and the user is not assgined to the board (project) then add the board to the user list.
                TaskBoard.find({_id: task.boardId},{assginedTo: user_id})
                .exec()
                .then(board =>{ if(!board)
                {
                  TaskBoard.updateOne({_id: task.boardId},{ $push: {assginedTo: user_id}})
                  .exec()
                  .then(added=>{
                    console.log(added);
                    return res.status(200).json({
                      message:'User was assgiend to task and the board was added to the user'
                    })
                  })
                  .catch(error=>{
                    return res.status(500).json({
                      message:'Wasnt able to add the task to user'
                      })
                    })
                }
                else
                {
                  return res.status(226).json({
                    message:'User alredy assgiend to the board and now was assigned to the task'
                    })
                }
              })
            })
              .catch(error=>{
                console.log(error);
                return res.status(500).json({
                  message:"Error finding task details"
                })
              })
            })
            .catch(error=>{
              console.log(error);
              return res.status(500).json({
                error
              })
            })
          }else{
            return res.status(226).json({
            message:'User alredy assgiend to the task'
            })
          }
        })
        .catch(error=>{
          console.log(error);
          return res.status(500).json({
            message: error
          })
        })
      }
    })
    .catch((err)=>{
      console.log(err);
      return res.status(500).json({
        error: err
      })
    })
});

//Each task has a description by passing the task id we are uspdting the body of the task.
//Update task description.
router.patch('/:taskId',checkAuth,(req,res,next)=>{
  const taskId = req.params.taskId;

  Task.updateOne({_id: taskId}, {$set: {taskDescription: req.body.description}})
  .exec()
  .then((result)=>{
    return res.status(200).json({
      message: result
    })
  })
  .catch((err)=>{
    return res.status(500).json({
      error: err
    })
  })
});

// //Each task has a dueDate by passing the task id we are updating the body of the task.
// //Update task dueDate.
// router.patch('/:taskId',checkAuth,(req,res,next)=>{
//   const taskId = req.params.taskId;

//   Task.updateOne({_id: taskId}, {$set: {dueDate: req.body.dueDate}})
//   .exec()
//   .then((result)=>{
//     return res.status(200).json({
//       message: result
//     })
//   })
//   .catch((err)=>{
//     return res.status(500).json({
//       error: err
//     })
//   })
// });


//Adding comments to the task, in Each task the members of the task can live a comment.
router.post('/comment/:taskId',checkAuth,(req,res,next)=>{
  const taskId = req.params.taskId;
  Task.updateOne({_id:taskId}, {$push: {comments: req.body.comment}})
  .exec()
  .then((result)=>{
    return res.status(200).json({
      message: result
    })
  })
  .catch((err)=>{
    return res.status(500).json({
      error: err
    })
  })
});



router.patch('/:userEmail', checkAuth, (req,res,next)=>{
  const user_email = req.params.userEmail;

  if(User.find({email: user_email})){
    User.find({email: user_email})
    .exec()
    .then(res=>{
      console.log(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

});

router.patch('/dueDate/:taskId/:dueDate',checkAuth,(req, res, next)=>{
  console.log(req.headers.user);
  const task_id= req.params.taskId;
  const due_date= req.params.dueDate;
  if(Task.find({_id:task_id})){
    Task.updateOne({_id:task_id}, {$set: {dueDate:due_date}})
    .exec()
    .then((result)=>{
      return res.status(200).json({
        message: "Due date was updated"
      })
    })
    .catch((err)=>{
      return res.status(500).json({
        error: err
      })
    })
  }
});

//Delete the task from the DB by passing the task id. 
router.delete('/:boardId/:taskId', checkAuth,(req,res,next)=>{
  const task_id = req.params.taskId
  const board_id = req.params.boardId
  TaskBoard.updateOne({_id: board_id}, { $pull: {tasks: task_id} })
  .exec()
  .then(result =>{
    console.log(result)
    Task.deleteOne({_id: task_id}).exec()
    .then((result)=>{
    return res.status(200).json({
      message:'Task was deleted.'
    })
  })
    .catch((error)=>{
      console.log(error);
      return res.status(500).json({
      message:'Wasnt able to delete the Task'
    })
  })
  .catch((error)=>{
    console.log(error);
    return res.status(500).json({
    message:'Wasnt able to delete the Task'
  })
})
});
})


module.exports = router;
