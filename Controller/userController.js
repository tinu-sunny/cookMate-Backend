const users = require("../Models/userModel");
 const bcrypt = require('bcrypt')
 const jwt = require('jsonwebtoken')

exports.regUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      res.status(402).json({ message: "user email exist" });
    } else {


      // pasword hashing

    const encryptedpassword =  await bcrypt.hash(password, 10);
    console.log(encryptedpassword);
    
      const newUser = new users({ username, email, password:encryptedpassword });
      await newUser.save();
      res.status(200).json({ message: " user registration success", newUser });
    }
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};




// login user 

exports.loginuser=async(req,res)=>{

  const {email,password}= req.body
  try{
      const user = await users.findOne({email})
      if(user){

 const pass= await bcrypt.compare(password, user.password);
console.log(pass);

          
          if(pass){

            const token = jwt.sign({userId:user._id},process.env.jwtkey)
            console.log(token);
            
            res.status(200).json({message:"user login",user,token})
          }
          else{
            res.status(402).json({message:'password mismatch'})
          }

      }
      else{
        res.status(403).json({message:"email not register"})
      }
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"error"})
    
  }
}
