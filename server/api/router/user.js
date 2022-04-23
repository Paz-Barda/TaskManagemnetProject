const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


//Return all users, This endpoint is not used in the app it used only for dev 
router.get('/', (req,res,next)=>{
  User.find({})
  .select('name email password myProjects')
  .then((result)=>{
    return res.status(200).json({
      result
    })
  })
  .catch((err)=>{
    return res.status(404).json({
      message:'No users yet'
    })
  })
});



//SignUp user
router.post('/signUp', (req,res,next)=>{

  //1)Check if the user is alredy exsisting the system 
  if(User.find({email: req.body.email}) > 1){
    return res.status(500).json({
      message:"Email is alredy in the system"
    })
  }
  else
  {
    //2) bcrypt the password that the user entered into the system.
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
      if(err){
        return res.status(500).json({
          error: err,
          message:'Wasnt able to save the password'
        })
      }
      else
      {

        //3)Create object of type user in order the save in the db
        const user = new User({
          _id:mongoose.Types.ObjectId(),
          name:req.body.name,
          // userName: req.body.userName,
          email: req.body.email,
          password: hash //Store the hash password.
        });

        user.save()
        .then(result=>{
          console.log(result);
          return res.status(200).json({
            message:'New user was creared', 
            user: result.name
          })
        })
        .catch(err=>{
          console.log(err);
          return res.status(500).json({
            message:'Wasnt able to create new user somthing went wrong'
          })
        })
      }
    })
    
  }
});


//Login user to the system.
router.post('/logIn', (req,res,next)=>{
  User.find({email: req.body.email})
  .exec()
  .then(user=>{
    //Check if the user is part of the DB. if no then return message.
    if(user.length < 1){
      return res.status(404).json({
        message:"User is not exissting in the system please sign-up"
      })
    }
    else
    {
      //If the user is part of the DB then bcrypt the password.
      bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
        if(err){
          return res.status(500).json({
            message: err
          })
        }
        else
        {
          //if the user is part of the DB and the password was correct then create JWT for the user that we will be using as part of the auth process.
          const token = jwt.sign(
            {
              name: user[0].name,
              email:user[0].email,
              userId:user[0]._id
            },
            `${process.env.JWT_SECRET_KEY}`,
            {
              expiresIn:"24h"
            }
          );

          return res.status(200).json({
            name:user[0].name, 
            email:user[0].email,
            token: token,
            id:user[0]._id
          })
        }
      })
    }
  })
  .catch(err=>{
    return res.status(500).json({
      message:"Wasnt able to login"
    })
  })
});

router.post('/checkLogedUser',checkAuth, (req,res,next)=>{
  //Checking if the conected user is looged in and valid user we are using the chechAuth checking the JWT, when the user is entering the homepage
  //if the token in the localstorgae is valid leave loogedin if no return to welcomepage
  User.find({email: req.body.email})
    .exec()
    .then((user)=>{
      return res.status(200).json({
        user:user,
        message:'Authnticated'
      })
    })
    .catch((error)=>{
      console.log(error);
      return res.status(404).json({
        message:'Login again'
      })
      
    })
  console.log('Trying to auth');
} );

module.exports = router;
