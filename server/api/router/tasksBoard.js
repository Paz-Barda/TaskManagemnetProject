const express = require('express');
const router = new express.Router();
const TaskBoard = require('../models/taskskBoard');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


//Create new board (Project that will store all the tasks of the project).
router.post('/newTaskBoard',checkAuth,(req,res,next)=>{

  //Create a new object of the board with all the details that was passed by the user.
  const taskBoard = new TaskBoard({
    _id: new mongoose.Types.ObjectId(),
    boardName: req.body.boardName,
    createdDate:new Date(),
    userName:req.body.userName,
    createdBy:req.body.userId,
    assginedTo:req.body.userId,
    tasks:[]//Empty list of the tasks that will contain later all the tasks of this board.
  });

  taskBoard.save()
  .then((result)=>{
    return res.status(200).json({
      message:'New board was created',
      createdBoard:{
        boardName: result.boardName,
        createdDate:new Date(),
        userName:result.userName,
        createdBy:result.userId,
        tasks: result.tasks
        // assginedTo:result.userId
      }
    })
  })
  .catch((error)=>{
    console.log(error);
    return res.status(500).json({
      message:'Wasnt able to create new board'
    })
  })
});


//Delete the board from the DB by passing the board id. 
router.delete('/:taskBoardId', checkAuth,(req,res,next)=>{
  const id = req.params.taskBoardId
  TaskBoard.deleteOne({_id: id}).exec()
  .then((result)=>{
    return res.status(200).json({
      message:'Board was delted.'
    })
  })
  .catch((error)=>{
    console.log(error);
    return res.status(500).json({
      message:'Wasnt able deleted the board'
    })
  })
});



//When the user is opening the profile page (Main screen) get all the boards projects that were assgined to him. 
//We will search the userId inside of the taskBoards under the assginedTo filed if the userId is located there then return this board to the user.
//To keep this process more secure i used with the post method.
router.post('/gettAllMyProjects', checkAuth,(req,res,next)=>{
  
  TaskBoard.find({assginedTo: req.body.userId})
  .exec()
  .then((ProjectBoards)=>{
    console.log(ProjectBoards);

    //If the user have boards projects then return the assgined board if no the return 0 and on the client side we will show a message.
    if(ProjectBoards.length > 0){
      return res.status(200).json({
        message:'All the projects that was assgined to you',
        projects: ProjectBoards
      })
    }else{
      return res.status(200).json({
        message:'No projects',
        projects: ProjectBoards
      })
    }
  })
  .catch((err)=>{
    return res.status(500).json({
      error: err
    })
  })
});


//Getting info regards the board. By passig the board id. 
router.get('/getBoardInfo/:boardId',checkAuth,(req,res,next)=>{
  const id = req.params.boardId;

  //Search for the board-id in the DB and return info.
  TaskBoard.find({_id:id}).exec()
  .then(board=>{
    return res.status(200).json({
      message:'Board was found',
      board: board
    })
  })
  .catch(error=>{
    return res.status(500).json({
      message:'Wasnt able to find board'
    })
  })
});

//When the user is creating a new task we are linking the new task to the board by passing the new task-id and adding it to the array of the tasks. 
router.patch('/:boardId', checkAuth, (req,res,next)=>{
  const id = req.params.boardId;

  TaskBoard.updateOne({_id: id}, { $push: {tasks: req.body.task} })
  .exec()
  .then((result)=>{
      return res.status(200).json(result._id);
  })
  .catch((err)=>{
      return res.status(500).json({
          error: err
      })
  });
});

router.patch('/:boardId/:UserEmail', checkAuth, (req,res,next)=>{
  const board_id = req.params.boardId;
  const user_email = req.params.UserEmail;  
  if(User.findOne({email: user_email})){
    User.find({email: user_email})
    .exec()
    .then(response=>{
      //if the length is 0 then the user is not part of the DB
      console.log(response.length)
      if(response.length ==0){
        return res.status(202).json({
          message:'User not exists in the system'
        })
      }else{
        //if the user was found
        //Then check if the user is alredy assgiend to the board if yes then we will found the board and we return message that the user alredy assgiend to the board 
        //if the board return empty it means that the user is not assgiend to the board and we need to add the user to the board
        console.log("here!!!!!" ,board_id)
        TaskBoard.findOne({_id:board_id ,assginedTo: response[0]._id})
        .exec()
        .then(board=>{
          // const user_id = response[0]._id
          //if we get NULL in the board it means that the board is not assgined and we need to add the user
          if(!board){
            TaskBoard.updateOne({_id: board_id},{ $push: {assginedTo: response[0]}})
            .exec()
            .then(add=>{
              console.log(add);
              return res.status(200).json({
              message:'User was assgiend to board'
              })
        })
          .catch(error=>{
            return res.status(500).json({
            message:'Wasnt able to add the board to user'
              })
            })
          }
          else{
            return res.status(226).json({
            message:'User alredy assgient to the board'
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
    });
  }
});

router.get('/', (req,res,next)=>{
  TaskBoard.find({})
  .select('_id boardName userName createdBy assginedTo tasks')
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

module.exports = router;
