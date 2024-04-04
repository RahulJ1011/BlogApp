const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()
const verify = async(req,res,next)=> {
  try
  {
    let token;
    token = req.header("Authorization")
    if(!token)
    {
      return res.status(403).json({msg:"token not found"})
    }
    token = token.split(" ")[1]
    const user = jwt.verify(token,process.env.JWT)
    req.user = user
    console.log(req.user)
    next()
  }
  catch(err)
  {
    res.status(500).json(err)
  }
}
module.exports = {verify}