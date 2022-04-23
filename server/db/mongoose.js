const mongoose = require('mongoose');

//conecting to the localhost server
mongoose.connect('mongodb://127.0.0.1:27017/pazAsana',{

  useNewUrlParser: true, 
  
  useUnifiedTopology: true 
  
  }, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  });