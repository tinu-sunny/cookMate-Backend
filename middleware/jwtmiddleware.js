const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside the jwt ');

    console.log(req.headers.authorization);
    console.log(req.headers.authorization.slice(7));

  const token = req.headers.authorization.slice(7);
  if (token) {
    console.log("token");
  } else {
    console.log("no -token");
  }
  console.log(token);

  try {
    const jwtVerification = jwt.verify(token, process.env.jwtkey);
    console.log(jwtVerification.userId);  
   // Extract needed info
  const userdata = {
    userId: jwtVerification.userId
  };

  console.log('JWT payload:', userdata);

  // Attach to request for later use
  req.payload = userdata;
  
  } catch (err) {
    res.status(401).json("authorization Error", err);
    console.log("401err",err);
    
  }
 
    
    
    next()
}

module.exports = jwtMiddleware;