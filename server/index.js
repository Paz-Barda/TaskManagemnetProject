const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./api/router/user');
const taskRouter = require('./api/router/task');
const tasksBoardRouter = require('./api/router/tasksBoard');
require('./db/mongoose');


const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Handel CORS errors
app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/users', userRouter);
app.use('/task', taskRouter);
app.use('/tasksBoard', tasksBoardRouter);

app.listen(port, ()=>{
  console.log(`Runing on port ${port}`);
})