const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

  console.log(req.headers.user);
  try{


    //Parseing the user data that was passed with the request in the headers. 
    toke_key = JSON.parse(req.headers.user);


    //Get the token from the parse request
    const token = toke_key.token;
    // console.log(token);

    //Decoded the jwt and check if its valid if no then throw error if fales, if valid then enter to the requested routh. 
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    req.userData= decoded;
    next();
  }catch(error){
    console.log(error);
    return res.status(401).json({
      message:'Auth faild'
  });
}
};



    // if(req.headers.user){//Handeling GET requests 
    //   toke_key = JSON.parse(req.headers.user) 
    // }else{
    //   //Handwling post requests
    //   try{
    //     //If the attached object is not a JSON then pares to JSON 
    //      toke_key = JSON.parse(req.body.user) 
    //   }catch(e){
    //     //Else if the attached oblext is alredy pared to JSON then save it ((Used for requests from postMan))
    //      toke_key = req.body.user
    //   }
    // }
    // console.log(toke_key);